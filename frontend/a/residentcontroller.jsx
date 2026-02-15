// <?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Resident;
// use App\Models\Household;
// use App\Models\EmploymentData;
// use App\Models\EducationData;
// use App\Models\ResidentAccount;
// use App\Models\Nationality;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;

// class ResidentController extends Controller
// {
//     /**
//      * Get all residents with temp address relationships
//      */
//     public function index()
//     {
//         $residents = Resident::with([
//             // 'tempPurok',
//             // 'tempStreet',
//             // 'household.purok',
//             // 'household.street',
//         ])
//         ->orderBy('created_at', 'desc')
//         ->get();

//         return response()->json($residents);
//     }

//     /**
//      * REGISTER NEW RESIDENT
//      * Address is saved to temp_ columns.
//      * Household is only assigned when staff approves (Verified).
//      */
//     public function register(Request $request)
//     {
//         $validated = $request->validate([
//             'firstName'         => 'required|string|max:100',
//             'middleName'        => 'nullable|string|max:100',
//             'lastName'          => 'required|string|max:100',
//             'suffix'            => 'nullable|string|max:10',
//             'birthdate'         => 'required|date',
//             'gender'            => 'required|in:Male,Female',
//             'contact'           => 'required|string|size:11',
//             'email'             => 'nullable|email|max:100',
//             'houseNumber'       => 'required|string|max:50',
//             'purok'             => 'required|string',
//             'street'            => 'required|string',
//             'householdPosition' => 'required|string',
//             'maritalStatus'     => 'nullable|string',
//             'nationality'       => 'nullable|string|max:100',
//             'sector'            => 'required|string',
//             'residencyStatus'   => 'required|string',
//             'isVoter'           => 'nullable|boolean',
//             'employmentStatus'  => 'nullable|string',
//             'occupation'        => 'nullable|string|max:100',
//             'incomeSource'      => 'nullable|string',
//             'monthlyIncome'     => 'nullable|numeric',
//             'educationalStatus' => 'nullable|string',
//             'schoolType'        => 'nullable|string',
//             'schoolLevel'       => 'nullable|string',
//             'highestGrade'      => 'nullable|string',
//             'idFront'           => 'required|image|max:5120',
//             'idBack'            => 'required|image|max:5120',
//             'idType'            => 'nullable|string',
//         ]);

//         DB::beginTransaction();

//         try {
//             $trackingNumber = $this->generateTrackingNumber();

//             $idFrontPath = $request->file('idFront')->store('resident_ids/front', 'public');
//             $idBackPath  = $request->file('idBack')->store('resident_ids/back', 'public');

//             $isVoter = $request->has('isVoter')
//                 ? filter_var($request->isVoter, FILTER_VALIDATE_BOOLEAN)
//                 : false;

//             $nationalityId = 1;
//             if (!empty($validated['nationality'])) {
//                 $nationality   = Nationality::firstOrCreate(['name' => $validated['nationality']]);
//                 $nationalityId = $nationality->id;
//             }

//             $resident = Resident::create([
//                 'tracking_number'      => $trackingNumber,
//                 'first_name'           => $validated['firstName'],
//                 'middle_name'          => $validated['middleName'],
//                 'last_name'            => $validated['lastName'],
//                 'suffix'               => $validated['suffix'],
//                 'birthdate'            => $validated['birthdate'],
//                 'gender'               => $validated['gender'],
//                 'contact_number'       => $validated['contact'],
//                 'email'                => $validated['email'],
//                 // Address stored temporarily until staff verifies
//                 'temp_house_number'    => $validated['houseNumber'],
//                 'temp_purok_id'        => $validated['purok'],
//                 'temp_street_id'       => $validated['street'],
//                 'household_position'   => $validated['householdPosition'],
//                 'marital_status_id'    => is_numeric($request->maritalStatus) ? $request->maritalStatus : null,
//                 'nationality_id'       => $nationalityId,
//                 'sector_id'            => $validated['sector'],
//                 'residency_status'     => $validated['residencyStatus'],
//                 'residency_start_date' => now(),
//                 'is_voter'             => $isVoter,
//                 'id_type'              => $validated['idType'] ?? 'Government ID',
//                 'id_front_path'        => $idFrontPath,
//                 'id_back_path'         => $idBackPath,
//                 'status'               => 'Pending',
//             ]);

//             EmploymentData::create([
//                 'resident_id'       => $resident->id,
//                 'employment_status' => $request->employmentStatus ?? 'N/A',
//                 'occupation'        => $request->occupation ?? null,
//                 'income_source'     => $request->incomeSource ?? 'N/A',
//                 'monthly_income'    => $request->monthlyIncome ?? 0,
//             ]);

//             EducationData::create([
//                 'resident_id'             => $resident->id,
//                 'educational_status'      => $request->educationalStatus ?? 'N/A',
//                 'school_type'             => $request->schoolType ?? 'N/A',
//                 'school_level'            => $request->schoolLevel ?? 'N/A',
//                 'highest_grade_completed' => $request->highestGrade ?? 'N/A',
//             ]);

//             DB::commit();

//             return response()->json([
//                 'success'        => true,
//                 'trackingNumber' => $trackingNumber,
//                 'residentData'   => [
//                     'id'            => $resident->id,
//                     'name'          => "{$resident->first_name} {$resident->last_name}",
//                     'status'        => 'Pending',
//                     'submittedDate' => $resident->created_at->format('F d, Y'),
//                 ],
//             ], 201);

//         } catch (\Exception $e) {
//             DB::rollBack();
//             \Log::error('Registration Error: ' . $e->getMessage());
//             return response()->json([
//                 'success' => false,
//                 'message' => 'Registration failed: ' . $e->getMessage(),
//             ], 500);
//         }
//     }

//     /**
//      * UPDATE RESIDENT STATUS
//      *
//      * Household rules:
//      *  - Anyone can be approved even without a Head of Family at their address.
//      *  - On Verify: uses temp_ columns to find/create the household.
//      *  - Only blocks if this resident wants to be Head and one already exists there.
//      *
//      * verified_by fix:
//      *  - Uses auth()->id() when a real session exists.
//      *  - Falls back to NULL (not hardcoded 1) to avoid FK violations during development.
//      */
//     public function updateStatus(Request $request, $id)
//     {
//         $resident  = Resident::findOrFail($id);
//         $validated = $request->validate([
//             'status' => 'required|in:Pending,For Verification,Verified,Rejected',
//         ]);

//         DB::beginTransaction();

//         try {
//             if ($validated['status'] === 'Verified') {

//                 $houseNumber = $resident->temp_house_number;
//                 $purokId     = $resident->temp_purok_id;
//                 $streetId    = $resident->temp_street_id;

//                 if (!$houseNumber || !$purokId || !$streetId) {
//                     throw new \Exception(
//                         'Resident address data is incomplete. Cannot assign to a household.'
//                     );
//                 }

//                 $existingHousehold = Household::where('house_number', $houseNumber)
//                     ->where('purok_id', $purokId)
//                     ->where('street_id', $streetId)
//                     ->first();

//                 if ($existingHousehold) {
//                     $householdId = $existingHousehold->id;

//                     // Block only if this resident also wants to be Head and slot is taken
//                     if (
//                         $resident->household_position === 'Head of Family' &&
//                         $existingHousehold->head_resident_id !== null
//                     ) {
//                         throw new \Exception(
//                             'A Head of Family already exists at this address. ' .
//                             'Please change the household position before approving.'
//                         );
//                     }

//                     // Assign as head if position matches and slot is empty
//                     if (
//                         $resident->household_position === 'Head of Family' &&
//                         $existingHousehold->head_resident_id === null
//                     ) {
//                         $existingHousehold->update(['head_resident_id' => $resident->id]);
//                     }

//                 } else {
//                     // No household at this address yet — create one for any position
//                     $newHousehold = Household::create([
//                         'household_id'     => $this->generateHouseholdId(),
//                         'house_number'     => $houseNumber,
//                         'purok_id'         => $purokId,
//                         'street_id'        => $streetId,
//                         'head_resident_id' => ($resident->household_position === 'Head of Family')
//                                                 ? $resident->id
//                                                 : null,
//                         'established_date' => now()->toDateString(),
//                     ]);
//                     $householdId = $newHousehold->id;
//                 }

//                 $barangayId   = $this->generateBarangayId();
//                 $tempPassword = $this->generateTempPassword();

//                 // FIX: null fallback — hardcoded 1 causes FK violation if no user exists
//                 $verifiedBy = auth()->check() ? auth()->id() : null;

//                 $resident->update([
//                     'status'       => 'Verified',
//                     'barangay_id'  => $barangayId,
//                     'household_id' => $householdId,
//                     'verified_at'  => now(),
//                     'verified_by'  => $verifiedBy,
//                 ]);

//                 ResidentAccount::updateOrCreate(
//                     ['resident_id' => $resident->id],
//                     [
//                         'username'             => $barangayId,
//                         'password'             => Hash::make($tempPassword),
//                         'must_change_password' => true,
//                     ]
//                 );

//                 DB::commit();

//                 return response()->json([
//                     'success' => true,
//                     'message' => 'Resident verified and assigned to household successfully.',
//                     'accountDetails' => [
//                         'username'      => $barangayId,
//                         'temp_password' => $tempPassword,
//                     ],
//                 ]);
//             }

//             // Simple status update for Pending / For Verification / Rejected
//             $resident->update(['status' => $validated['status']]);
//             DB::commit();

//             return response()->json(['success' => true]);

//         } catch (\Exception $e) {
//             DB::rollBack();
//             \Log::error('UpdateStatus Error: ' . $e->getMessage());
//             return response()->json([
//                 'success' => false,
//                 'message' => $e->getMessage(),
//             ], 500);
//         }
//     }

//     // ─── Tracking ─────────────────────────────────────────────────────────────

//     public function track($trackingNumber)
//     {
//         $trackingNumber = strtoupper(trim($trackingNumber));
//         $resident       = Resident::where('tracking_number', $trackingNumber)->first();

//         if (!$resident) {
//             return response()->json(['success' => false, 'message' => 'Tracking number not found'], 404);
//         }

//         $messages = [
//             'Pending'          => 'Your registration is being reviewed by barangay staff.',
//             'For Verification' => 'Please visit Barangay Hall for identity verification. Bring your original ID.',
//             'Verified'         => 'You are now a verified resident! Check your account credentials.',
//             'Rejected'         => 'Registration was not approved. Contact the Barangay Hall for details.',
//         ];

//         return response()->json([
//             'success' => true,
//             'data'    => [
//                 'trackingNumber' => $resident->tracking_number,
//                 'barangayId'     => $resident->barangay_id,
//                 'name'           => "{$resident->first_name} {$resident->last_name}",
//                 'status'         => $resident->status,
//                 'message'        => $messages[$resident->status] ?? 'Status unknown',
//                 'dateSubmitted'  => $resident->created_at->format('F d, Y'),
//                 'verifiedDate'   => $resident->verified_at?->format('F d, Y'),
//             ],
//         ]);
//     }

//     // ─── Household check ──────────────────────────────────────────────────────

//     public function checkHousehold(Request $request)
//     {
//         $household = Household::with('headResident')
//             ->where('house_number', $request->houseNumber)
//             ->where('purok_id', $request->purokId)
//             ->where('street_id', $request->streetId)
//             ->first();

//         if (!$household || !$household->head_resident_id) {
//             return response()->json(['exists' => false, 'message' => 'No Head of Family registered yet.']);
//         }

//         return response()->json([
//             'exists'      => true,
//             'householdId' => $household->household_id,
//             'headName'    => $household->headResident
//                 ? "{$household->headResident->first_name} {$household->headResident->last_name}"
//                 : null,
//             'memberCount' => $household->residents()->count(),
//         ]);
//     }

//     // ─── Private helpers ──────────────────────────────────────────────────────

//     private function generateTrackingNumber()
//     {
//         do {
//             $number = 'BGN-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
//         } while (Resident::where('tracking_number', $number)->exists());
//         return $number;
//     }

//     private function generateHouseholdId()
//     {
//         $count = Household::count() + 1;
//         return 'HH-' . str_pad($count, 5, '0', STR_PAD_LEFT);
//     }

//     private function generateBarangayId()
//     {
//         $last = Resident::whereNotNull('barangay_id')->orderBy('barangay_id', 'desc')->first();
//         $num  = $last ? ((int) substr($last->barangay_id, 4)) + 1 : 1;
//         return 'BGN-' . str_pad($num, 5, '0', STR_PAD_LEFT);
//     }

//     private function generateTempPassword()
//     {
//         $chars    = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
//         $password = '';
//         for ($i = 0; $i < 6; $i++) {
//             $password .= $chars[rand(0, strlen($chars) - 1)];
//         }
//         return $password;
//     }
//     public function show($id)
// {
   
//     $resident = Resident::findOrFail($id); 
//     return response()->json($resident);
// }
// }