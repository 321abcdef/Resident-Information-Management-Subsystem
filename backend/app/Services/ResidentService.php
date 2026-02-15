<?php

namespace App\Services;

use App\Models\Resident;
use App\Models\Household;
use App\Models\EmploymentData;
use App\Models\EducationData;
use App\Models\Nationality;
use App\Models\Sector;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ResidentService
{
    public function createResidentRecord(array $data, $files)
    {
        return DB::transaction(function () use ($data, $files) {
            $trackingNumber = $this->generateTrackingNumber();

           
             $nationalityName = $data['nationality'] ?? 'Filipino';
        $nationality = Nationality::firstOrCreate(['name' => $nationalityName]);
        $nationalityId = $nationality->id;

            // 2. Handle File Uploads
            $idFrontPath = isset($files['idFront']) ? $files['idFront']->store('resident_ids/front', 'public') : null;
            $idBackPath  = isset($files['idBack']) ? $files['idBack']->store('resident_ids/back', 'public') : null;

            // 3. Create Resident
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
                'nationality_id'       => $nationalityId, 
                'sector_id'            => $data['sector'] ?? null,
                'household_position'   => $data['householdPosition'],
                'residency_status'     => $data['residencyStatus'] ?? 'New Resident',
                'residency_start_date' => $data['residencyStartDate'] ?? now()->format('Y-m-d'),
                'is_voter'             => filter_var($data['isVoter'] ?? false, FILTER_VALIDATE_BOOLEAN),
                'id_front_path'        => $idFrontPath,
                'id_back_path'         => $idBackPath,
                'status'               => 'Pending',
            ]);

            // 4. Create Employment Data
            EmploymentData::create([
                'resident_id'       => $resident->id,
                'employment_status' => $data['employmentStatus'] ?? 'N/A',
                'occupation'        => $data['occupation'] ?? null,
                'income_source'     => $data['incomeSource'] ?? 'N/A',
                'monthly_income'    => $data['monthlyIncome'] ?? 'No Income',
            ]);

            // 5. Create Education Data
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

    // --- Generator functions follow (generateTrackingNumber, etc.) ---
    public function generateTrackingNumber() 
    { 
        do { 
            $num = 'BGN-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT); 
        } while (Resident::where('tracking_number', $num)->exists());
        
        return $num;
    }

    public function generateBarangayId()
    {
        $lastResident = Resident::whereNotNull('barangay_id')
            ->where('barangay_id', 'LIKE', 'BGN-%')
            ->orderByRaw('CAST(SUBSTRING(barangay_id, 5) AS UNSIGNED) DESC')
            ->first();

        if (!$lastResident) return 'BGN-00001';

        $lastNumber = (int) str_replace('BGN-', '', $lastResident->barangay_id);
        return 'BGN-' . str_pad($lastNumber + 1, 5, '0', STR_PAD_LEFT);
    }

    public function generateTempPassword() { return Str::random(8); }

     public function generateHouseholdId() {
        return 'HH-' . str_pad(Household::count() + 1, 5, '0', STR_PAD_LEFT);
    }
}