<?php

namespace App\Services;

use App\Models\Resident;
use App\Models\Household;
use App\Models\EmploymentData;
use App\Models\EducationData;
use App\Models\Nationality;
use App\Models\User;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ResidentService
{
    /**
     * Safe from SQL Injection: Uses Eloquent DB Transaction and Parameter Binding
     */
    public function createResidentRecord(array $data, $files)
    {
        return DB::transaction(function () use ($data, $files) {
            $trackingNumber = $this->generateTrackingNumber();

            // FirstOrCreate is safe: It uses prepared statements
            $nationalityName = $data['nationality'] ?? 'Filipino';
            $nationality = Nationality::firstOrCreate(['name' => $nationalityName]);

            // Handle File Uploads
            $idFrontPath = isset($files['idFront']) ? $files['idFront']->store('resident_ids/front', 'public') : null;
            $idBackPath  = isset($files['idBack']) ? $files['idBack']->store('resident_ids/back', 'public') : null;

            // Safe: Eloquent's create method automatically sanitizes inputs
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
                'marital_status_id'    => is_numeric($data['maritalStatus'] ?? null) ? $data['maritalStatus'] : null,
                'nationality_id'       => $nationality->id, 
                'sector_id'            => $data['sector'] ?? null,
                'household_position'   => $data['householdPosition'],
                'residency_status'     => $data['residencyStatus'] ?? 'New Resident',
                'residency_start_date' => $data['residencyStartDate'] ?? now()->format('Y-m-d'),
                'is_voter'             => filter_var($data['isVoter'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'id_front_path'        => $idFrontPath,
                'id_back_path'         => $idBackPath,
                'status'               => 'Pending',
            ]);

            EmploymentData::create([
                'resident_id'       => $resident->id,
                'employment_status' => $data['employmentStatus'] ?? 'N/A',
                'occupation'        => $data['occupation'] ?? null,
                'income_source'     => $data['incomeSource'] ?? 'N/A',
                'monthly_income'    => $data['monthlyIncome'] ?? 'No Income',
            ]);

            EducationData::create([
                'resident_id'             => $resident->id,
                'educational_status'      => $data['educationalStatus'] ?? 'N/A',
                'school_type'             => $data['schoolType'] ?? 'N/A',
                'school_level'            => $data['schoolLevel'] ?? 'N/A', // corrected key
                'highest_grade_completed' => $data['highestGrade'] ?? 'N/A',
            ]);

            return $resident;
        });
    }

    /**
     * Anti-Duplicate & Soft-Delete Aware
     */
    public function generateBarangayId()
    {
        // withTrashed ensures we don't pick an ID that exists in a deleted record
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
        // Avoid using count() - it's not safe with deletions
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

    public function generateTempPassword() { return Str::random(8); }

   public function transferHousehold($resident, $newAddress) {
    return DB::transaction(function () use ($resident, $newAddress) {

        Household::where('head_resident_id', $resident->id)
                 ->update(['head_resident_id' => null]);

     
        $newHouseholdId = $this->assignToHouseholdLogic($resident, $newAddress);

        // 3. Update resident
        $resident->update(['household_id' => $newHouseholdId]);
        
        return $newHouseholdId;
    });
}

    public function assignToHouseholdLogic($resident, $addressData = null) 
{
    $houseNumber = $addressData['houseNumber'] ?? $resident->temp_house_number;
    $purokId     = $addressData['purokId']     ?? $resident->temp_purok_id;
    $streetId    = $addressData['streetId']    ?? $resident->temp_street_id;

    $house = Household::where('house_number', $houseNumber)
        ->where('purok_id', $purokId)
        ->where('street_id', $streetId)
        ->first();

    if ($house) {
        if ($resident->household_position === 'Head of Family') {
       
            if ($house->head_resident_id !== null && $house->head_resident_id != $resident->id) {
         
                throw new \Exception('A Head of Family already exists at this address.');
            }
            $house->update(['head_resident_id' => $resident->id]);
        }
        return $house->id;
    }

    $newHouse = Household::create([
        'household_id' => $this->generateHouseholdId(),
        'house_number' => $houseNumber,
        'purok_id' => $purokId,
        'street_id' => $streetId,
        'head_resident_id' => ($resident->household_position === 'Head of Family') ? $resident->id : null,
        'established_date' => now(),
    ]);

    return $newHouse->id;
}

public function verifyResident($residentId)
{
    return DB::transaction(function () use ($residentId) {
        $resident = Resident::findOrFail($residentId);
        
        // 1. Update Resident Status
        $resident->update([
            'status' => 'Verified',
            'barangay_id' => $this->generateBarangayId(), // Dito na magkakaroon ng BGN ID
        ]);

        // 2. Create User Account + QR Token
        return User::create([
            'resident_id' => $resident->id,
            'username'    => $resident->tracking_number, // Default username
            'password'    => Hash::make('default_password'),
            'qr_token'    => Str::random(32), // <--- DITO MO NA I-GE-GENERATE
            'is_active'   => 1,
            'role'        => 'resident',
        ]);
    });
}

}

