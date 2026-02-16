<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use App\Services\ResidentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\ResidentAccount;
use App\Models\Household;
use Illuminate\Support\Facades\Log;

class StaffController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

  
   public function index() {
    try {
        $submissions = Resident::with([
            'maritalStatus', 
            'nationality', 
            'sector', 
            'employmentData', 
            'educationData',
            'tempPurok',   
            'tempStreet'   
        ])
     
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($resident) {
            $resident->resolved_purok = $resident->tempPurok ? "Purok " . $resident->tempPurok->number : 'N/A';
            $resident->resolved_street = $resident->tempStreet ? $resident->tempStreet->name : 'N/A';
            return $resident;
        });

        return response()->json($submissions);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch submissions.'], 500);
    }
}

public function updateStatus(Request $request, $id) {
    $resident = Resident::findOrFail($id);
    $status = $request->status;

    DB::beginTransaction();
    try {
        if ($status === 'Verified') {
        
            $householdId = $this->service->assignToHouseholdLogic($resident);
            
            $barangayId  = $this->service->generateBarangayId();
            $tempPass    = $this->service->generateTempPassword();
            $verifiedBy  = auth()->check() ? auth()->id() : null;

            $resident->update([
                'status' => 'Verified', 
                'barangay_id' => $barangayId,
                'household_id' => $householdId,
                'verified_at' => now(),
                'verified_by' => $verifiedBy
            ]);

            ResidentAccount::updateOrCreate(
                ['resident_id' => $resident->id],
                [
                    'username' => $barangayId, 
                    'password' => Hash::make($tempPass), 
                    'must_change_password' => true
                ]
            );

            DB::commit();
            return response()->json([
                'success' => true,
                'residentData' => [
                    'id'   => $barangayId,
                    'name' => $resident->name, 
                    'user' => $barangayId,
                    'pass' => $tempPass
                ]
            ]);
        }

        $resident->update(['status' => $status]);
        DB::commit();
        return response()->json(['success' => true]);

    } catch (\Exception $e) {
        DB::rollBack();
        Log::error("Update Status Error (ID $id): " . $e->getMessage());
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}

 
    public function publicVerify($barangay_id) {
        $resident = Resident::where('barangay_id', $barangay_id)
            ->select('first_name', 'last_name', 'middle_name', 'suffix', 'status', 'barangay_id', 'created_at')
            ->first();

        if (!$resident) {
            return response()->json(['success' => false, 'message' => 'Invalid ID'], 404);
        }

        if ($resident->status !== 'Verified') {
            return response()->json(['success' => false, 'message' => 'This ID is not yet verified.'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'full_name' => trim("{$resident->first_name} {$resident->middle_name} {$resident->last_name} {$resident->suffix}"),
                'id' => $resident->barangay_id,
                'status' => $resident->status,
                'member_since' => $resident->created_at->format('F Y')
            ]
        ]);
    }
}