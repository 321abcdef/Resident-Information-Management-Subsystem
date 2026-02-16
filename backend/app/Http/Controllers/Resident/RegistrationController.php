<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\ResidentService;
use App\Models\Household;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RegistrationController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

    public function register(Request $request) {
        try {
            // 1. DYNAMIC VALIDATION RULES
            $formRequest = new RegisterRequest();
            $rules = $formRequest->rules();

         
            $rules['sector'] = 'nullable'; 
            $rules['nationality'] = 'required';
            $rules['idFront'] = 'required|file|mimes:jpeg,png,jpg,webp|max:5120';
            $rules['idBack'] = 'required|file|mimes:jpeg,png,jpg,webp|max:5120';

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Check your inputs.'
                ], 422);
            }

            // 2. CHECK FILE VALIDITY
            if (!$request->hasFile('idFront') || !$request->hasFile('idBack')) {
                return response()->json([
                    'success' => false,
                    'message' => 'File error, double check your submitted file.'
                ], 422);
            }

            // 3. CHECK HOUSEHOLD LOGIC
           if ($request->householdPosition === 'Head of Family') {
    $alreadyExistsVerified = Household::where('house_number', $request->houseNumber)
        ->where('purok_id', $request->purok)
        ->where('street_id', $request->street)
        ->whereNotNull('head_resident_id')->exists();

    $alreadyExistsPending = Resident::where('temp_house_number', $request->houseNumber)
        ->where('temp_purok_id', $request->purok)
        ->where('temp_street_id', $request->street)
        ->where('household_position', 'Head of Family')
        ->where('status', 'Pending')->exists();

    // DITO ANG PAGBABAGO:
    if ($alreadyExistsVerified || $alreadyExistsPending) {
        return response()->json([
            'success' => false,
            'message' => 'The head of the family already exists or is pending for this household.'
        ], 422); 
    }
}

            // 4. EXECUTE SERVICE LOGIC
        
            $resident = $this->service->createResidentRecord(
                $validator->validated(), 
                $request->allFiles()
            );

            return response()->json([
    'success' => true, 
    'trackingNumber' => $resident->tracking_number,
    'resident' => [
        'name' => $resident->name,
        'status' => $resident->status,
        'submittedDate' => $resident->created_at->format('F d, Y')
    ],
    'message' => 'Registration successful!'
], 201);
            
        } catch (\Exception $e) {
        
            Log::error('Registration Fail: ' . $e->getMessage());
            return response()->json([
                'success' => false, 
                'message' => 'Error: ' . $e->getMessage() 
            ], 500);
        }
    }

    public function track($trackingNumber)
    {
        $trackingNumber = strtoupper(trim($trackingNumber));
        $resident = Resident::where('tracking_number', $trackingNumber)->first();

        if (!$resident) {
            return response()->json([
                'success' => false, 
                'message' => 'Tracking number not found.'
            ], 404);
        }

        $messages = [
            'Pending'          => 'Your registration is being reviewed by barangay staff. Please wait.',
            'For Verification' => 'Initial application approved! Visit the Brgy. Hall with your original ID.',
            'Verified'         => 'Congratulations! You are now a verified resident of Brgy. Gulod.',
            'Rejected' => 'Your registration was not approved. Please visit the Brgy. Hall or re-submit with correct information.'
        ];

        return response()->json([
            'success' => true,
            'data'    => [
                'trackingNumber' => $resident->tracking_number,
                'name'           => "{$resident->first_name} {$resident->last_name}",
                'status'         => $resident->status,
                'message'        => $messages[$resident->status] ?? 'Status unknown.',
                'dateSubmitted'  => $resident->created_at->format('F d, Y'),
                'verifiedDate'   => $resident->verified_at ? $resident->verified_at->format('F d, Y') : null,
            ],
        ]);
    }

    public function checkHousehold(Request $request) {
        $household = Household::with('headResident')
            ->where('house_number', $request->houseNumber)
            ->where('purok_id', $request->purokId)
            ->where('street_id', $request->streetId)->first();
            
        return response()->json([
            'exists' => (bool)$household,
            'headName' => $household?->headResident ? $household->headResident->first_name . ' ' . $household->headResident->last_name : null
        ]);
    }
}