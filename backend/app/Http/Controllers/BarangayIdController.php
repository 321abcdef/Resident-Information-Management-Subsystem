<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;

class BarangayIDController extends Controller
{

public function show($barangay_id)
{
    $resident = Resident::with(['household.street', 'household.purok'])
        ->where('barangay_id', $barangay_id)
        ->first();

    if (!$resident) {
        return response()->json(['message' => 'Resident not found'], 404);
    }

    $mname = $resident->middle_name ? $resident->middle_name . ' ' : '';
    $suffix = $resident->suffix ? ' ' . $resident->suffix : ''; 
    
    // Format: FIRST MIDDLE LAST SUFFIX (e.g., JUAN MARCOS DELA CRUZ JR)
    $fullName = $resident->first_name . ' ' . $mname . $resident->last_name . $suffix;

    return response()->json([
        'barangay_id' => $resident->barangay_id,
        'full_name'   => strtoupper($fullName), 
        'photo'       => $resident->id_front_path ? asset('storage/' . $resident->id_front_path) : null,
        'signature'   => $resident->id_back_path ? asset('storage/' . $resident->id_back_path) : null,
        'address'     => strtoupper(
            ($resident->household->house_number ?? '') . ' ' . 
            ($resident->household->street->name ?? '') . ' ' . 
            ($resident->household->purok->name ?? '')
        ),
        'date_issued' => $resident->verified_at ? date('m/d/Y', strtotime($resident->verified_at)) : date('m/d/Y'),
        'valid_until' => $resident->verified_at ? date('Y', strtotime($resident->verified_at . ' +1 year')) : (date('Y') + 1)
    ]);
}
}
