<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResidentController extends Controller
{
    public function index()
    {
        try {
       
            $residents = Resident::select('*', 
                DB::raw("CONCAT(first_name, ' ', last_name) as name")
            )
            ->where('status', 'Verified') // <--- Filter verified only
            ->orderBy('last_name', 'asc')
            ->get();

            return response()->json($residents);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $resident = Resident::findOrFail($id);
        
        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'age' => 'sometimes|integer',
            'temp_purok_id' => 'sometimes',
            'temp_house_number' => 'sometimes',
            'is_pwd' => 'sometimes|boolean'
        ]);

        $resident->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Resident updated successfully',
            'data' => $resident
        ]);
    }

    public function destroy($id)
    {
        $resident = Resident::findOrFail($id);
        $resident->delete();
        return response()->json(['success' => true]);
    }
}