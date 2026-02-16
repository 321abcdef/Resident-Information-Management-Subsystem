<?php

namespace App\Http\Controllers;

use App\Models\Household;
use Illuminate\Http\Request;

class HouseholdController extends Controller
{
 public function index()
{
    $households = Household::with(['headResident', 'residents.sector', 'purok', 'street'])

        ->whereHas('residents') 
        ->get()
        ->map(function ($hh) {
            return [
                'db_id' => $hh->id,
                'id' => $hh->household_id, 
                'head' => $hh->headResident ? $hh->headResident->name : 'No Head Assigned',
                'address' => $hh->house_number . ' ' . ($hh->street->name ?? ''),
                'purok' => $hh->purok->number ?? 'N/A',
                'members' => $hh->residents->count(),
                'status' => $hh->is_active ? 'Active' : 'Inactive',
                'memberList' => $hh->residents->map(function ($res) {
                    return [
                        'name' => $res->name,
                        'relation' => $res->household_position,
                        'age' => $res->age, 
                        'sector' => $res->sector->name ?? 'General Population'
                    ];
                })
            ];
        });

    return response()->json($households);
}

}