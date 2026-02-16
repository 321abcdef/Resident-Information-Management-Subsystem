<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Resident\RegistrationController;
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\BarangayIDController;
use App\Http\Controllers\HouseholdController;

// 1. PUBLIC & REGISTRATION
Route::post('/register', [RegistrationController::class, 'register']);
Route::get('/track/{trackingNumber}', [RegistrationController::class, 'track']);
Route::post('/check-household', [RegistrationController::class, 'checkHousehold']);
Route::get('/residents/verify-public/{barangay_id}', [StaffController::class, 'publicVerify']);

// 2. VERIFICATION PAGE (Staff Submissions)
Route::get('/submissions', [StaffController::class, 'index']); 

// 3. RESIDENT MANAGEMENT (RBI - Verified Only)
Route::get('/residents', [ResidentController::class, 'index']); 
Route::put('/residents/{id}', [ResidentController::class, 'update']);
Route::get('/reference-data', [ResidentController::class, 'getReferenceData']);
Route::delete('/residents/{id}', [ResidentController::class, 'destroy']);

// 4. ACTION
Route::put('/residents/{id}/status', [StaffController::class, 'updateStatus']);

Route::get('/locations', [LocationController::class, 'index']);

Route::get('/barangay-id/{barangay_id}', [BarangayIdController::class, 'show']);

// households lists
Route::get('/households', [HouseholdController::class, 'index']);
Route::get('/debug-households', function() {
    return [
        'total_households' => \App\Models\Household::count(),
        'households_with_residents' => \App\Models\Household::whereHas('residents')->count(),
        'all_residents_count' => \App\Models\Resident::count(),
        'residents_without_household' => \App\Models\Resident::whereNull('household_id')->count(),
    ];
});