<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\ResidentService;
use App\Models\Resident;
use App\Models\Household;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

   public function register(RegisterRequest $request) {
    try {

        if ($request->householdPosition === 'Head of Family') {
            
            $alreadyExists = Household::where('house_number', $request->houseNumber)
                ->where('purok_id', $request->purok)
                ->where('street_id', $request->street)
                ->whereNotNull('head_resident_id')
                ->exists();

            if ($alreadyExists) {
          
                return response()->json([
                    'success' => false,
                    'message' => 'Validation Error: There is already a Head of Family registered at this specific address. Please choose "Member" or verify your address.'
                ], 422); 
            }
        }

   
        $resident = $this->service->createResidentRecord($request->validated(), $request->allFiles());
        return response()->json(['success' => true, 'trackingNumber' => $resident->tracking_number], 201);
        
    } catch (\Exception $e) {
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}

    public function track($trackingNumber)
{
    $trackingNumber = strtoupper(trim($trackingNumber));
    $resident = \App\Models\Resident::where('tracking_number', $trackingNumber)->first();

    if (!$resident) {
        return response()->json([
            'success' => false, 
            'message' => 'Tracking number not found'
        ], 404);
    }

    $messages = [
        'Pending'          => 'Your registration is being reviewed by barangay staff. Please wait for updates.',
        'For Verification' => 'Your initial application is approved! Please visit the Barangay Hall for identity verification. Bring your original ID.',
        'Verified'         => 'Congratulations! You are now a verified resident.',
        'Rejected'         => 'Your registration was not approved. This might be due to incomplete requirements or invalid data.',
    ];

    return response()->json([
        'success' => true,
        'data'    => [
            'trackingNumber' => $resident->tracking_number,
            'barangayId'     => $resident->barangay_id,
            'name'           => "{$resident->first_name} {$resident->last_name}",
            'status'         => $resident->status,
            'message'        => $messages[$resident->status] ?? 'Status unknown. Please visit the Barangay Hall.',
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