<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Models\Household;
use App\Services\ResidentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ResidentController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

 
    public function index()
    {
        try {
            $residents = Resident::where('status', 'Verified')
                ->with(['maritalStatus', 'nationality', 'sector', 'employmentData', 'educationData', 'tempPurok', 'tempStreet'])
                ->orderBy('id', 'asc')
                ->get()
                ->map(function($resident) {
                    // Name Formatting
                    $middleInitial = $resident->middle_name 
                        ? ' ' . strtoupper(substr($resident->middle_name, 0, 1)) . '.' 
                        : '';
                    $suffix = $resident->suffix ? ' ' . $resident->suffix : '';
                    
                    $resident->name = trim($resident->first_name . $middleInitial . ' ' . $resident->last_name . $suffix);
                    
                    // Age & Address
                    $resident->age = $resident->birthdate ? Carbon::parse($resident->birthdate)->age : 'N/A';
                    $resident->resolved_purok = $resident->tempPurok ? "Purok " . $resident->tempPurok->number : 'N/A';
                    $resident->resolved_street = $resident->tempStreet ? $resident->tempStreet->name : 'N/A';
                    $resident->full_address = trim(($resident->temp_house_number ?? '') . ' ' . ($resident->tempStreet->name ?? ''));

                    // Employment Data mapping for React
                    $resident->employmentStatus = $resident->employmentData->employment_status ?? 'N/A';
                    $resident->occupation = $resident->employmentData->occupation ?? 'None';
                    $resident->monthly_income = $resident->employmentData->monthly_income ?? 'N/A';
                    $resident->incomeSource = $resident->employmentData->income_source ?? 'N/A';

                    // Education Data mapping for React
                    $resident->educationalStatus = $resident->educationData->educational_status ?? 'N/A';
                    $resident->schoolType = $resident->educationData->school_type ?? 'N/A';
                    $resident->schoolLevel = $resident->educationData->school_level ?? 'N/A';
                    $resident->highestGrade = $resident->educationData->highest_grade_completed ?? 'N/A';

                    return $resident;
                });

            return response()->json($residents);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update Resident Information & Household Logic
     */
    public function update(Request $request, $id) {
        try {
            DB::beginTransaction();
            
            $resident = Resident::findOrFail($id);
            
            // 1. Pre-capture values
            $oldPosition = $resident->household_position;
            $newPosition = $request->household_position;
            $oldHouseholdId = $resident->household_id;

            // 2. Address Change Detection
            $addressChanged = ($resident->temp_house_number != $request->temp_house_number || 
                               $resident->temp_purok_id != $request->temp_purok_id || 
                               $resident->temp_street_id != $request->temp_street_id);

            if ($addressChanged) {
         
                if ($oldPosition === 'Head of Family' && $oldHouseholdId) {
                    Household::where('id', $oldHouseholdId)->update(['head_resident_id' => null]);
                }

                $newHouseholdId = $this->service->transferHousehold($resident, [
                    'houseNumber' => $request->temp_house_number,
                    'purokId'     => $request->temp_purok_id,
                    'streetId'    => $request->temp_street_id
                ]);
                
                $resident->household_id = $newHouseholdId;
            }

            // 3. Household Head Logic (The Force Override)
            $currentHouseholdId = $resident->household_id;

            if ($newPosition === 'Head of Family') {
    
                Household::where('id', $currentHouseholdId)->update(['head_resident_id' => null]);
                
             
                Household::where('id', $currentHouseholdId)->update(['head_resident_id' => $resident->id]);
            } 
            elseif ($oldPosition === 'Head of Family' && $newPosition !== 'Head of Family') {
          
                Household::where('id', $currentHouseholdId)
                    ->where('head_resident_id', $resident->id)
                    ->update(['head_resident_id' => null]);
            }

            // 4. Update Main Resident Table
            $basicData = $request->only([
                'first_name', 'middle_name', 'last_name', 'suffix', 'gender', 
                'contact_number', 'birth_registration', 'temp_house_number', 
                'temp_purok_id', 'temp_street_id', 'residency_start_date', 
                'marital_status_id', 'nationality_id', 'sector_id', 'birthdate', 
                'household_position'
            ]);

            if ($request->has('is_voter')) {
                $basicData['is_voter'] = ($request->is_voter === 'Yes' || $request->is_voter == 1) ? 1 : 0;
            }

            $resident->update($basicData);

            // 5. Update Education Table
            if ($resident->educationData) {
                $resident->educationData->update([
                    'educational_status' => $request->educationalStatus,
                    'school_type' => $request->schoolType,
                    'school_level' => $request->schoolLevel,
                    'highest_grade_completed' => $request->highestGrade,
                ]);
            }

            // 6. Update Employment Table
            if ($resident->employmentData) {
                $resident->employmentData->update([
                    'employment_status' => $request->employmentStatus,
                    'occupation' => $request->occupation,
                    'monthly_income' => $request->monthly_income,
                    'income_source' => $request->incomeSource,
                ]);
            }

            DB::commit();
            return response()->json(['success' => true, 'message' => 'Successfully updated!']);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Resident Update Error: " . $e->getMessage());
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get Reference Data for Dropdowns
     */
    public function getReferenceData() {
        return response()->json([
            'puroks' => \App\Models\Purok::all(),
            'streets' => \App\Models\Street::all(),
            'marital_statuses' => \App\Models\MaritalStatus::all(),
            'sectors' => \App\Models\Sector::all(),
            'nationalities' => \App\Models\Nationality::all(),
            'genders' => ['Male', 'Female'],
            'birth_registrations' => ['Registered', 'Not Registered'],
            'residency_statuses' => ['Old Resident', 'New Resident'],
            'educational_statuses' => ['Currently Studying', 'Graduated', 'Not Studying', 'N/A'],
            'school_types' => ['Public', 'Private', 'N/A'],
            'school_levels' => ['Pre-School', 'Elementary', 'Junior High School', 'Senior High School', 'College', 'Vocational', 'Masteral', 'N/A'],
            'monthly_income' => ['Below 10,000', '10,000 - 20,000', '20,001 - 30,000', '30,001 - 50,000', 'Above 50,000', 'N/A'],
            'income_sources' => ['Employment', 'Business', 'Remittance', 'Investments', 'Others', 'N/A'],
            'employment_statuses' => ['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired', 'N/A'],
        ]);
    }

    /**
     * Soft Delete Resident & Deactivate Account
     */
    public function destroy($id) {
        try {
            DB::beginTransaction();
            $resident = Resident::findOrFail($id);
            
            // Deactivate account if exists
            if ($resident->account) {
                $resident->account->update(['is_active' => 0]);
            }

            // If head of household, vacate the position first
            if ($resident->household_position === 'Head of Family' && $resident->household_id) {
                Household::where('id', $resident->household_id)->update(['head_resident_id' => null]);
            }

            $resident->delete(); 
            
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}