<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use App\Models\Household;
use App\Models\ResidentAccount;
use App\Services\ResidentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    protected $service;

    public function __construct(ResidentService $service) {
        $this->service = $service;
    }

    public function index() {
        return response()->json(Resident::orderBy('created_at', 'desc')->get());
    }

    public function show($id) {
        return response()->json(Resident::findOrFail($id));
    }

    // StaffController.php

public function updateStatus(Request $request, $id) {
    $resident = Resident::findOrFail($id);
    $status = $request->status;

    DB::beginTransaction();
    try {
        if ($status === 'Verified') {
            $householdId = $this->assignToHousehold($resident);
            $barangayId  = $this->service->generateBarangayId();
            $tempPass    = $this->service->generateTempPassword();

            $verifiedBy = auth()->check() ? auth()->id() : null;

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
                    'name' => "{$resident->first_name} {$resident->last_name}",
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
        return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
    }
}

    private function assignToHousehold($resident) {
        $houseNumber = $resident->temp_house_number;
        $purokId     = $resident->temp_purok_id;
        $streetId    = $resident->temp_street_id;

        if (!$houseNumber || !$purokId || !$streetId) {
            throw new \Exception('Incomplete address data. Please update the resident record first.');
        }

        $house = Household::where('house_number', $houseNumber)
            ->where('purok_id', $purokId)
            ->where('street_id', $streetId)
            ->first();

        if ($house) {
            // Check if Head of Family slot is taken
            if ($resident->household_position === 'Head of Family' && $house->head_resident_id !== null) {
                throw new \Exception('A Head of Family already exists at this address.');
            }
            
            // Assign as head if position matches and slot is empty
            if ($resident->household_position === 'Head of Family') {
                $house->update(['head_resident_id' => $resident->id]);
            }
            return $house->id;
        }

   
        $newHouse = Household::create([
            'household_id' => $this->service->generateHouseholdId(),
            'house_number' => $houseNumber,
            'purok_id' => $purokId,
            'street_id' => $streetId,
            'head_resident_id' => ($resident->household_position === 'Head of Family') ? $resident->id : null,
            'established_date' => now(),
        ]);
        return $newHouse->id;
    }
    // StaffController.php

public function publicVerify($barangay_id)
{
    
    $resident = Resident::where('barangay_id', $barangay_id)
        ->select('first_name', 'last_name', 'middle_name', 'suffix', 'status', 'barangay_id', 'created_at')
        ->first();

    if (!$resident) {
        return response()->json(['success' => false, 'message' => 'Invalid ID'], 404);
    }

    if ($resident->status !== 'Verified') {
        return response()->json(['success' => false, 'message' => 'This ID is not currently verified.'], 403);
    }

    return response()->json([
        'success' => true,
        'data' => [
            'full_name' => "{$resident->first_name} {$resident->middle_name} {$resident->last_name} {$resident->suffix}",
            'id' => $resident->barangay_id,
            'status' => $resident->status,
            'member_since' => $resident->created_at->format('F Y')
        ]
    ]);
}
}