<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Resident\RegistrationController;
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\BarangayIDController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\BarangayAnalyticsController; 
use App\Http\Controllers\Auth\ResidentLoginController;

// 1. STAFF ROUTES 
Route::prefix('staff')->group(function () {
    Route::get('/residents', [StaffController::class, 'index']);
    Route::put('/residents/{id}/status', [StaffController::class, 'updateStatus']);
});

// ADD THIS LINE: frontend verificationService.getSubmissions()
Route::get('/submissions', [StaffController::class, 'index']);

// 2. PUBLIC & REGISTRATION
Route::post('/register', [RegistrationController::class, 'register']);
Route::get('/track/{trackingNumber}', [RegistrationController::class, 'track']);
Route::post('/check-household', [RegistrationController::class, 'checkHousehold']);

// 3. RESIDENT MANAGEMENT (RBI)
Route::get('/residents', [ResidentController::class, 'index']); 
Route::put('/residents/{id}', [ResidentController::class, 'update']); // General update (profile edit)
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

// 5. ANALYTICS ROUTES
Route::prefix('analytics')->group(function () {
    Route::get('/overview',     [BarangayAnalyticsController::class, 'overview']);
    Route::get('/demographics', [BarangayAnalyticsController::class, 'demographics']);
    Route::get('/sectors',      [BarangayAnalyticsController::class, 'sectors']);
    Route::get('/registration', [BarangayAnalyticsController::class, 'registration']);
    Route::get('/livelihood',   [BarangayAnalyticsController::class, 'livelihood']);    
    Route::get('/heatmap',      [BarangayAnalyticsController::class, 'heatmap']);
    Route::get('/insights',     [BarangayAnalyticsController::class, 'insights']);
    Route::get('/all',          [BarangayAnalyticsController::class, 'all']);
});

// Find group of households or residents
Route::get('/households/check-head', [App\Http\Controllers\Resident\RegistrationController::class, 'checkHousehold']);

