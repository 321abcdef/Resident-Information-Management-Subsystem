<?php

namespace App\Services;

use App\Models\Resident;
use App\Models\Household;
use App\Models\EmploymentData;
use App\Models\EducationData;
use App\Models\Nationality;
use App\Models\ResidentAccount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResidentService
{
   public function createResidentRecord(array $data, $files)
{
    return DB::transaction(function () use ($data, $files) {
        $trackingNumber = $this->generateTrackingNumber();

        // File Uploads
        $idFrontPath = $files['idFront']->store('resident_ids/front', 'public');
        $idBackPath  = $files['idBack']->store('resident_ids/back', 'public');

        $nationalityId = 1;
      
        if (!empty($data['nationality'] ?? null)) {
            $nationality = Nationality::firstOrCreate(['name' => $data['nationality']]);
            $nationalityId = $nationality->id;
        }

        $resident = Resident::create([
            'tracking_number'      => $trackingNumber,
            'first_name'           => $data['firstName'] ?? '',
            'middle_name'          => $data['middleName'] ?? null, 
            'last_name'            => $data['lastName'] ?? '',
            'suffix'               => $data['suffix'] ?? null,   
            'birthdate'            => $data['birthdate'] ?? null,
            'gender'               => $data['gender'] ?? null,
            'contact_number'       => $data['contact'] ?? '',
            'email'                => $data['email'] ?? null,
            'temp_house_number'    => $data['houseNumber'] ?? '',
            'temp_purok_id'        => $data['purok'] ?? '',
            'temp_street_id'       => $data['street'] ?? '',
            'household_position'   => $data['householdPosition'] ?? '',
            'marital_status_id'    => is_numeric($data['maritalStatus'] ?? null) ? $data['maritalStatus'] : null,
            'nationality_id'       => $nationalityId,
            'sector_id'            => $data['sector'] ?? null,
            'residency_status'     => $data['residencyStatus'] ?? '',
            'residency_start_date' => now(),
            'is_voter'             => filter_var($data['isVoter'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'id_type'              => $data['idType'] ?? 'Government ID',
            'id_front_path'        => $idFrontPath,
            'id_back_path'         => $idBackPath,
            'status'               => 'Pending',
        ]);

            EmploymentData::create([
                'resident_id'       => $resident->id,
                'employment_status' => $data['employmentStatus'] ?? 'N/A',
                'occupation'        => $data['occupation'] ?? null,
                'income_source'     => $data['incomeSource'] ?? 'N/A',
                'monthly_income'    => $data['monthlyIncome'] ?? 0,
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

    public function generateTrackingNumber() {
        do { $num = 'BGN-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT); } 
        while (Resident::where('tracking_number', $num)->exists());
        return $num;
    }

    public function generateHouseholdId() {
        return 'HH-' . str_pad(Household::count() + 1, 5, '0', STR_PAD_LEFT);
    }

    public function generateBarangayId() {
        $last = Resident::whereNotNull('barangay_id')->orderBy('barangay_id', 'desc')->first();
        $num  = $last ? ((int) substr($last->barangay_id, 4)) + 1 : 1;
        return 'BGN-' . str_pad($num, 5, '0', STR_PAD_LEFT);
    }

    public function generateTempPassword() {
        return substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 6);
    }
}