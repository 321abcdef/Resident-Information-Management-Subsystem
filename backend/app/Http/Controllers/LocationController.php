<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; 

class LocationController extends Controller
{
    public function index()
    {
        try {
         
            $puroks = DB::table('puroks')->get(); 
            $streets = DB::table('streets')->get(); 

            return response()->json([
                'success' => true,
                'puroks' => $puroks,
                'streets' => $streets
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}