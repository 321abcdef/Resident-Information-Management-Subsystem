<?php

namespace App\Services;

use App\Models\Resident;
use App\Models\EmploymentData;
use App\Models\EducationData;
use App\Models\Nationality;
use App\Models\Household;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResidentService
{
    /**
     * Create initial pending registration
     */
    public function createResidentRecord(array $data, $files)
    {
        return DB::transaction(function () use ($data, $files) {
            $trackingNumber = $this->generateTrackingNumber();
            $nationality = Nationality::firstOrCreate(['name' => $data['nationality'] ?? 'Filipino']);

            $idFrontPath = isset($files['idFront']) ? $files['idFront']->store('resident_ids/front', 'public') : null;
            $idBackPath  = isset($files['idBack']) ? $files['idBack']->store('resident_ids/back', 'public') : null;

            // Normalize Household Position
            $position = $data['householdPosition'] ?? 'Others';
            if ($position === 'Head') {
                $position = 'Head of Family';
            }

            $resident = Resident::create([
                'tracking_number'      => $trackingNumber,
                'first_name'           => $data['firstName'],
                'middle_name'          => $data['middleName'] ?? null,
                'last_name'            => $data['lastName'],
                'suffix'               => $data['suffix'] ?? null,
                'birthdate'            => $data['birthdate'],
                'birth_registration'   => $data['birthRegistration'] ?? null,
                'gender'               => $data['gender'],
                'contact_number'       => $data['contact'],
                'email'                => $data['email'] ?? null,
                'temp_house_number'    => $data['houseNumber'],
                'temp_purok_id'        => $data['purok'],
                'temp_street_id'       => $data['street'],
                'marital_status_id'    => $data['maritalStatus'] ?? null,
                'nationality_id'       => $nationality->id, 
                'sector_id'            => $data['sector'] ?? null,
                'household_position'   => $position,
                'residency_status'     => $data['residencyStatus'] ?? 'New Resident',
                'residency_start_date' => $data['residencyStartDate'] ?? now()->format('Y-m-d'),
                'is_voter'             => filter_var($data['isVoter'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'id_front_path'        => $idFrontPath,
                'id_back_path'         => $idBackPath,
                'status'               => 'Pending',
                'registration_payload' => [
                    'tenure_status' => $data['tenureStatus'] ?? null,
                    'wall_material' => $data['wallMaterial'] ?? null,
                    'roof_material' => $data['roofMaterial'] ?? null,
                    'water_source'  => $data['waterSource']  ?? null,
                ],
            ]);

            EmploymentData::create([
                'resident_id'       => $resident->id,
                'employment_status' => $data['employmentStatus'] ?? 'N/A',
                'occupation'        => $data['occupation'] ?? null,
                'income_source'     => $data['incomeSource'] ?? 'N/A',
                'monthly_income'    => $data['monthlyIncome'] ?? '0',
            ]);

            EducationData::create([
                'resident_id'             => $resident->id,
                'educational_status'      => $data['educationalStatus'] ?? 'N/A',
                'school_type'             => $data['schoolType'] ?? 'N/A',
                'school_level'            => $data['schoolLevel'] ?? 'N/A',
                'highest_grade_completed' => $data['highestGrade'] ?? 'N/A',
            ]);

            return $resident;
        });
    }

    /**
     * Approve/Verify Resident and move data to Households
     */
    public function verifyResident($residentId)
{
    return DB::transaction(function () use ($residentId) {
        $resident = Resident::findOrFail($residentId);
        
        // 1. Assign Barangay ID
        if (!$resident->barangay_id) {
            $resident->barangay_id = $this->generateBarangayId();
        }

        // 2. Household Logic 
        try {
            $householdId = $this->assignToHouseholdLogic($resident);
            $resident->household_id = $householdId;
        } catch (\Exception $e) {
            throw new \Exception("Household Error: " . $e->getMessage());
        }

        $resident->status = 'Verified';
        $resident->verified_at = now();
        $resident->save();

      // 3. ACCOUNT CREATION
$user = User::where('resident_id', $resident->id)->first();

if (!$user) {
    try {
        $plainPassword = $this->generateTempPassword(); // generate 8 random chars
        
        $user = User::create([
            'resident_id' => $resident->id,
            'username'    => $resident->barangay_id,
            'password'    => Hash::make($plainPassword), 
            'name'        => "{$resident->first_name} {$resident->last_name}", 
            'email'       => $resident->email, // 
            'qr_token'    => Str::random(32), 
            'is_active'   => 1,
            'role'        => 'resident',
        ]);

       
        $user->temp_plain_password = $plainPassword; 

    } catch (\Exception $e) {
        throw new \Exception("User Creation Error: " . $e->getMessage());
    }
}   

        return $user;
    });
}

    /**
     * Finds or creates a household and maps survey data from the registration payload
     */
    public function assignToHouseholdLogic($resident, $addressData = null) 
    {
        $payload = $resident->registration_payload;
        
        // Ensure payload is an array (Handle JSON casting if not set in Model)
        if (is_string($payload)) {
            $payload = json_decode($payload, true);
        }

        $houseNumber = $addressData['houseNumber'] ?? $resident->temp_house_number;
        $purokId     = $addressData['purokId']      ?? $resident->temp_purok_id;
        $streetId    = $addressData['streetId']     ?? $resident->temp_street_id;

        $house = Household::where('house_number', $houseNumber)
            ->where('purok_id', $purokId)
            ->where('street_id', $streetId)
            ->first();

        $surveyData = [
            'tenure_status' => $payload['tenure_status'] ?? null,
            'wall_material' => $payload['wall_material'] ?? null,
            'roof_material' => $payload['roof_material'] ?? null,
            'water_source'  => $payload['water_source']  ?? null,
        ];

        if ($house) {
            if ($resident->household_position === 'Head of Family') {
                if ($house->head_resident_id !== null && $house->head_resident_id != $resident->id) {
                    throw new \Exception('A Head of Family already exists at this address.');
                }
                
                $house->update(array_merge([
                    'head_resident_id' => $resident->id,
                ], $surveyData));
            }
            return $house->id;
        }

        $newHouse = Household::create(array_merge([
            'household_id'     => $this->generateHouseholdId(),
            'house_number'     => $houseNumber,
            'purok_id'         => $purokId,
            'street_id'        => $streetId,
            'head_resident_id' => ($resident->household_position === 'Head of Family') ? $resident->id : null,
            'established_date' => now(),
        ], $surveyData));

        return $newHouse->id;
    }

    public function generateBarangayId()
    {
        $lastResident = Resident::withTrashed()
            ->whereNotNull('barangay_id')
            ->where('barangay_id', 'LIKE', 'BGN-%')
            ->orderByRaw('CAST(SUBSTRING(barangay_id, 5) AS UNSIGNED) DESC')
            ->first();

        $lastNumber = $lastResident ? (int) str_replace('BGN-', '', $lastResident->barangay_id) : 0;
        
        do {
            $lastNumber++;
            $newId = 'BGN-' . str_pad($lastNumber, 5, '0', STR_PAD_LEFT);
        } while (Resident::withTrashed()->where('barangay_id', $newId)->exists());

        return $newId;
    }

    public function generateHouseholdId()
    {
        $lastHouse = Household::withTrashed()
            ->where('household_id', 'LIKE', 'HH-%')
            ->orderByRaw('CAST(SUBSTRING(household_id, 4) AS UNSIGNED) DESC')
            ->first();

        $lastNumber = $lastHouse ? (int) str_replace('HH-', '', $lastHouse->household_id) : 0;
        
        do {
            $lastNumber++;
            $newId = 'HH-' . str_pad($lastNumber, 5, '0', STR_PAD_LEFT);
        } while (Household::withTrashed()->where('household_id', $newId)->exists());

        return $newId;
    }

    public function generateTrackingNumber() 
    { 
        do { 
            $num = 'BGN-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT); 
        } while (Resident::withTrashed()->where('tracking_number', $num)->exists());
        
        return $num;
    }

    public function generateTempPassword() 
    { 
        return Str::random(8); 
    }

    public function transferHousehold($resident, $newAddress) {
        return DB::transaction(function () use ($resident, $newAddress) {
            Household::where('head_resident_id', $resident->id)
                     ->update(['head_resident_id' => null]);

            $newHouseholdId = $this->assignToHouseholdLogic($resident, $newAddress);
            $resident->update(['household_id' => $newHouseholdId]);
            
            return $newHouseholdId;
        });
    }
}