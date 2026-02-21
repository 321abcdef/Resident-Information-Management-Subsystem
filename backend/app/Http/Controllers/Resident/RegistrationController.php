<?php

namespace App\Http\Controllers\Resident;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Services\ResidentService;
use App\Models\Household;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RegistrationController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

    public function register(RegisterRequest $request) {
        try {
            // 1. Check Household Logic (Prevent multiple Heads)
            if ($request->householdPosition === 'Head') {
                $existsVerified = Household::where('house_number', $request->houseNumber)
                    ->where('purok_id', $request->purok)
                    ->where('street_id', $request->street)
                    ->whereNotNull('head_resident_id')->exists();

                $existsPending = Resident::where('temp_house_number', $request->houseNumber)
                    ->where('temp_purok_id', $request->purok)
                    ->where('temp_street_id', $request->street)
                    ->where('household_position', 'Head of Family')
                    ->where('status', 'Pending')->exists();

                if ($existsVerified || $existsPending) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The head of the family already exists or is pending for this household.'
                    ], 422); 
                }
            }

            // 2. Execute Service Logic
            $resident = $this->service->createResidentRecord(
                $request->validated(), 
                $request->allFiles()
            );

            return response()->json([
                'success' => true, 
                'trackingNumber' => $resident->tracking_number,
                'resident' => [
                    'name' => "{$resident->first_name} {$resident->last_name}",
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
        $resident = Resident::where('tracking_number', strtoupper(trim($trackingNumber)))->first();

        if (!$resident) {
            return response()->json(['success' => false, 'message' => 'Tracking number not found.'], 404);
        }

        $messages = [
            'Pending'          => 'Your registration is being reviewed by staff. Please wait.',
            'For Verification' => 'Approved! Visit Brgy. Hall with your original ID and other required documents.',
            'Verified'         => 'You are now a verified resident!',
            'Rejected'         => 'Registration rejected. Please visit Brgy. Hall.'
        ];

        return response()->json([
            'success' => true,
            'data'    => [
                'trackingNumber' => $resident->tracking_number,
                'name'           => "{$resident->first_name} {$resident->last_name}",
                'status'         => $resident->status,
                'message'        => $messages[$resident->status] ?? 'Status unknown.',
                'dateSubmitted'  => $resident->created_at->format('F d, Y'),
            ],
        ]);
    }

   public function checkHousehold(Request $request) {

    $purokId = $request->query('purok_id');
    $streetId = $request->query('street_id');
    $houseNum = $request->query('house_number');


    $household = Household::where('house_number', $houseNum)
        ->where('purok_id', $purokId)
        ->where('street_id', $streetId)
        ->whereNotNull('head_resident_id')
        ->first();

    $pendingHead = Resident::where('temp_house_number', $houseNum)
        ->where('temp_purok_id', $purokId)
        ->where('temp_street_id', $streetId)
        ->where('household_position', 'Head of Family') 
        ->where('status', 'Pending')
        ->exists();

    return response()->json([
        'success' => true,
        'exists' => (bool)$household || $pendingHead,
    ]);
}
}