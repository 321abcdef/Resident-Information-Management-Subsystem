<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resident;
use App\Models\Household;
use App\Models\EmploymentData;
use App\Models\EducationData;
use App\Models\ResidentAccount;
use App\Models\MaritalStatus;
use App\Models\Nationality;
use App\Models\Purok;
use App\Models\Sector;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResidentController extends Controller
{
    /**
     * Get all residents with relationships
     */
    public function index()
    {
        $residents = Resident::with([

        ])
        ->orderBy('created_at', 'desc')
        ->get();
        
        return response()->json($residents);
    }

    /**
     * REGISTER NEW RESIDENT - FIXED VERSION
     */
    public function register(Request $request)
    {
        // === FIXED VALIDATION ===
        $validated = $request->validate([
            'firstName' => 'required|string|max:100',
            'middleName' => 'nullable|string|max:100',
            'lastName' => 'required|string|max:100',
            'suffix' => 'nullable|string|max:10',
            'birthdate' => 'required|date',
            'gender' => 'required|in:Male,Female',
            
            // Contact
            'contact' => 'required|string|size:11',
            'email' => 'nullable|email|max:100',
            
            // Address
            'houseNumber' => 'required|string|max:50',
            'purok' => 'required|string',
            'street' => 'required|string',
            
            // Household
            'householdPosition' => 'required|string',
            
            // Additional Info
            'maritalStatus' => 'nullable|string',
            'nationality' => 'nullable|string|max:100', // ✅ FIXED: Now nullable string
            'sector' => 'required|string',
            'residencyStatus' => 'required|string',
            'isVoter' => 'nullable|boolean', // ✅ FIXED: Now nullable boolean
            
            // Employment
            'employmentStatus' => 'nullable|string',
            'occupation' => 'nullable|string|max:100',
            'incomeSource' => 'nullable|string',
            'monthlyIncome' => 'nullable|numeric',
            
            // Education
            'educationalStatus' => 'nullable|string',
            'schoolType' => 'nullable|string',
            'schoolLevel' => 'nullable|string',
            'highestGrade' => 'nullable|string',
            
            // ID Verification
            'idFront' => 'required|image|max:5120',
            'idBack' => 'required|image|max:5120',
            'idType' => 'nullable|string'
        ]);

        DB::beginTransaction();
        
        try {
            $trackingNumber = $this->generateTrackingNumber();
            
            // Handle Household Logic
            // $household = $this->handleHousehold(
            //      $validated['houseNumber'],
            //      $validated['purok'],
            //      $validated['street'],
            //      $validated['householdPosition']
            // );
            
            // Upload ID Images
            $idFrontPath = $request->file('idFront')->store('resident_ids/front', 'public');
            $idBackPath = $request->file('idBack')->store('resident_ids/back', 'public');
            
            // ✅ FIXED: is_voter handling
            $isVoter = $request->has('isVoter') 
                ? filter_var($request->isVoter, FILTER_VALIDATE_BOOLEAN) 
                : false;

            // ✅ FIXED: Nationality handling
            $nationalityId = 1; // Default to Filipino
            if (!empty($validated['nationality'])) {
                // Try to find or create nationality
                $nationality = Nationality::firstOrCreate(
                    ['name' => $validated['nationality']],
                    ['name' => $validated['nationality']]
                );
                $nationalityId = $nationality->id;
            }

            // === CREATE RESIDENT ===
            $resident = Resident::create([
                'tracking_number' => $trackingNumber,
                'first_name' => $validated['firstName'],
                'middle_name' => $validated['middleName'],
                'last_name' => $validated['lastName'],
                'suffix' => $validated['suffix'],
                'birthdate' => $validated['birthdate'],
                'gender' => $validated['gender'],
                'contact_number' => $validated['contact'],
                'email' => $validated['email'],
                // 'household_id' => $household->id,
                'household_position' => $validated['householdPosition'],
                'marital_status_id' => is_numeric($request->maritalStatus) ? $request->maritalStatus : null,
                'nationality_id' => $nationalityId,
                'sector_id' => $validated['sector'],
                'residency_status' => $validated['residencyStatus'],
                'residency_start_date' => now(),
                'is_voter' => $isVoter,
                'id_type' => $validated['idType'] ?? 'Government ID',
                'id_front_path' => $idFrontPath,
                'id_back_path' => $idBackPath,
                'status' => 'Pending'
            ]);
            
            // Employment Data
            EmploymentData::create([
                'resident_id' => $resident->id,
                'employment_status' => $request->employmentStatus ?? 'N/A',
                'occupation' => $request->occupation ?? null,
                'income_source' => $request->incomeSource ?? 'N/A',
                'monthly_income' => $request->monthlyIncome ?? 0,
            ]);
            
            // Education Data
            EducationData::create([
                'resident_id' => $resident->id,
                'educational_status' => $request->educationalStatus ?? 'N/A',
                'school_type' => $request->schoolType ?? 'N/A',
                'school_level' => $request->schoolLevel ?? 'N/A',
                'highest_grade_completed' => $request->highestGrade ?? 'N/A'
            ]);
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'trackingNumber' => $trackingNumber,
                'residentData' => [
                    'id' => $resident->id,
                    'name' => "{$resident->first_name} {$resident->last_name}",
                    'status' => 'Pending',
                    'submittedDate' => $resident->created_at->format('F d, Y')
                ]
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Registration Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * GENERATE UNIQUE TRACKING NUMBER
     */
    private function generateTrackingNumber()
    {
        do {
            $number = 'BGN-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (Resident::where('tracking_number', $number)->exists());
        
        return $number;
    }

    /**
     * HANDLE HOUSEHOLD CREATION/ASSIGNMENT
     */
    private function handleHousehold($houseNumber, $purokId, $streetId, $position)
    {
        $existingHousehold = Household::where('house_number', $houseNumber)
            ->where('purok_id', $purokId)
            ->where('street_id', $streetId)
            ->first();
        
        if ($position === 'Head of Family') {
            if ($existingHousehold && $existingHousehold->head_resident_id) {
                throw new \Exception('A Head of Family already exists at this address.');
            }
            
            return Household::create([
                'household_id' => $this->generateHouseholdId(),
                'house_number' => $houseNumber,
                'purok_id' => $purokId,
                'street_id' => $streetId,
                'established_date' => now()
            ]);
        } else {
            if (!$existingHousehold) {
                throw new \Exception('No household found at this address. A Head of Family must register first.');
            }
            
            return $existingHousehold;
        }
    }

    /**
     * GENERATE HOUSEHOLD ID
     */
    private function generateHouseholdId()
    {
        $count = Household::count() + 1;
        return 'HH-' . str_pad($count, 5, '0', STR_PAD_LEFT);
    }

    /**
     * UPDATE RESIDENT STATUS
     */
    public function updateStatus(Request $request, $id)
{
    $resident = Resident::findOrFail($id);
    $validated = $request->validate(['status' => 'required|in:Pending,For Verification,Verified,Rejected']);

    DB::beginTransaction();
    try {
        if ($validated['status'] === 'Verified') {
            // 1. Find if an existing household exists at their EXACT address
            $existingHousehold = Household::where('house_number', $resident->house_number)
                ->where('purok_id', $resident->purok_id)
                ->where('street_id', $resident->street_id)
                ->first();

            if ($existingHousehold) {
                // If found, include them here
                $householdId = $existingHousehold->id;
                
                // If they are the Head and the household has no Head yet, they become the Head
                if ($resident->household_position === 'Head of Family' && !$existingHousehold->head_resident_id) {
                    $existingHousehold->update(['head_resident_id' => $resident->id]);
                }
            } else {
                // If no household is found at that address, CREATE a new one
                $newHousehold = Household::create([
                    'household_id' => $this->generateHouseholdId(),
                    'house_number' => $resident->house_number,
                    'purok_id' => $resident->purok_id,
                    'street_id' => $resident->street_id,
                    'head_resident_id' => ($resident->household_position === 'Head of Family') ? $resident->id : null,
                    'established_date' => now()
                ]);
                $householdId = $newHousehold->id;
            }

            // 2. Generate IDs and Account
            $barangayId = $this->generateBarangayId();
            $tempPassword = $this->generateTempPassword();

            $resident->update([
                'status' => 'Verified',
                'barangay_id' => $barangayId,
                'household_id' => $householdId, // Grouped here
                'verified_at' => now(),
                'verified_by' => auth()->id() ?? 1
            ]);

            ResidentAccount::updateOrCreate(
                ['resident_id' => $resident->id],
                [
                    'username' => $barangayId,
                    'password' => Hash::make($tempPassword),
                    'must_change_password' => true
                ]
            );

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Verified and grouped to household successfully',
                'accountDetails' => ['username' => $barangayId, 'temp_password' => $tempPassword]
            ]);
        }

        // Simple status update for Rejected/Pending
        $resident->update(['status' => $validated['status']]);
        DB::commit();
        return response()->json(['success' => true]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}
    /**
     * GENERATE UNIQUE BARANGAY ID
     */
    private function generateBarangayId()
    {
        $lastResident = Resident::whereNotNull('barangay_id')
            ->orderBy('barangay_id', 'desc')
            ->first();
        
        if (!$lastResident) {
            return 'BGN-00001';
        }
        
        $lastNumber = (int) substr($lastResident->barangay_id, 4);
        $newNumber = $lastNumber + 1;
        
        return 'BGN-' . str_pad($newNumber, 5, '0', STR_PAD_LEFT);
    }

    /**
     * GENERATE TEMPORARY PASSWORD
     */
    private function generateTempPassword()
    {
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $password = '';
        
        for ($i = 0; $i < 6; $i++) {
            $password .= $chars[rand(0, strlen($chars) - 1)];
        }
        
        return $password;
    }

    /**
     * ✅ FIXED: TRACK REGISTRATION STATUS
     */
    public function track($trackingNumber)
    {
        // Clean the tracking number
        $trackingNumber = strtoupper(trim($trackingNumber));
        
        \Log::info('Tracking search for: ' . $trackingNumber);
        
        $resident = Resident::with([])
            ->where('tracking_number', $trackingNumber)
            ->first();
        
        if (!$resident) {
            return response()->json([
                'success' => false,
                'message' => 'Tracking number not found'
            ], 404);
        }
        
        $messages = [
            'Pending' => 'Your registration is being reviewed by barangay staff.',
            'For Verification' => 'Please visit Barangay Hall for identity verification. Bring your original ID.',
            'Verified' => 'You are now a verified resident! Check your account credentials.',
            'Rejected' => 'Registration was not approved. Contact the Barangay Hall for details.'
        ];
        
        return response()->json([
            'success' => true,
            'data' => [
                'trackingNumber' => $resident->tracking_number,
                'barangayId' => $resident->barangay_id,
                'name' => "{$resident->first_name} {$resident->last_name}",
                'status' => $resident->status,
                'message' => $messages[$resident->status] ?? 'Status unknown',
                'dateSubmitted' => $resident->created_at->format('F d, Y'),
                'verifiedDate' => $resident->verified_at 
                    ? $resident->verified_at->format('F d, Y') 
                    : null
            ]
        ]);
    }

    /**
     * CHECK IF ADDRESS HAS HEAD OF FAMILY
     */
    public function checkHousehold(Request $request)
    {
        $household = Household::with('headResident')
            ->where('house_number', $request->houseNumber)
            ->where('purok_id', $request->purokId)
            ->where('street_id', $request->streetId)
            ->first();
        
        if (!$household) {
            return response()->json([
                'exists' => false,
                'message' => 'No household found at this address'
            ]);
        }
        
        if (!$household->head_resident_id) {
            return response()->json([
                'exists' => false,
                'message' => 'No Head of Family registered yet'
            ]);
        }
        
        return response()->json([
            'exists' => true,
            'householdId' => $household->household_id,
            'headName' => $household->headResident 
                ? "{$household->headResident->first_name} {$household->headResident->last_name}"
                : null,
            'memberCount' => $household->residents()->count()
        ]);
    }
}