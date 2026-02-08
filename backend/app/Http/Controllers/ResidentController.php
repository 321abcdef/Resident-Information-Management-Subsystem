<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resident;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ResidentController extends Controller
{
    public function index()
    {
    
        $residents = Resident::orderBy('created_at', 'desc')->get();
        return response()->json($residents);
    }

    public function register(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'birthdate' => 'required|date',
            'contact' => 'required|string',
            'idFront' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'idBack' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

 
        $idFrontPath = $request->file('idFront')->store('ids', 'public');
        $idBackPath = $request->file('idBack')->store('ids', 'public');

 
        $trackingNumber = 'BSB-' . date('Y') . '-' . rand(1000, 9999);

        $resident = new Resident();
        $resident->first_name = $request->firstName;
        $resident->middle_name = $request->middleName;
        $resident->last_name = $request->lastName;
        $resident->suffix = $request->suffix;
        $resident->birthdate = $request->birthdate;
        $resident->age = $request->age;
        $resident->gender = $request->gender;
        $resident->house_number = $request->houseNumber;
        $resident->purok = $request->purok;
        $resident->street = $request->street;
        $resident->contact = $request->contact;
        $resident->id_front_path = $idFrontPath;
        $resident->id_back_path = $idBackPath;
        $resident->tracking_number = $trackingNumber;
        $resident->status = 'Pending'; 
        $resident->save();

        return response()->json([
            'success' => true,
            'message' => 'Registration successful!',
            'trackingNumber' => $trackingNumber
        ], 201);
    }

  
    public function updateStatus(Request $request, $id)
    {
        $resident = Resident::findOrFail($id);
        $resident->status = $request->status;
        $resident->save();

        return response()->json(['success' => true]);
    }


    public function track($number)
{
    $resident = Resident::where('tracking_number', $number)->first();

    if ($resident) {
       
        $status = $resident->status;
        $message = "Your profile is under review."; 

        if ($status === 'For Verification') {
            $message = "Please visit the Barangay Hall for identity verification. Bring your physical ID.";
        } elseif ($status === 'Verified') {
            $message = "You are now a verified resident of Barangay San Bartolome.";
        } elseif ($status === 'Rejected') {
            $message = "Registration denied. Please contact the Barangay Hall for more details.";
        }

        return response()->json([
            'success' => true,
            'data' => [
                'trackingNumber' => $resident->tracking_number,
                'name' => $resident->first_name . ' ' . $resident->last_name,
                'status' => $status,
                'dateSubmitted' => $resident->created_at->format('F d, Y'),
                'message' => $message 
            ]
        ]);
    }

    return response()->json(['success' => false, 'message' => 'Tracking number not found.'], 404);
}
} 