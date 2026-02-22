<?php

use Illuminate\Support\Facades\Route;

/**
 * Controller Imports
 */
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\BarangayIDController;
use App\Http\Controllers\HouseholdController;
use App\Http\Controllers\Auth\ResidentLoginController;

// Registration Controller
use App\Http\Controllers\Resident\RegistrationController;

// Analytics Controllers (Invokable structure)
use App\Http\Controllers\Api\Analytics\AnalyticsController;
use App\Http\Controllers\Api\Analytics\OverviewController;
use App\Http\Controllers\Api\Analytics\DemographicsController;
use App\Http\Controllers\Api\Analytics\SectorsController;
use App\Http\Controllers\Api\Analytics\AnalyticsReg;
use App\Http\Controllers\Api\Analytics\LivelihoodController;
use App\Http\Controllers\Api\Analytics\HeatmapController;
use App\Http\Controllers\Api\Analytics\InsightsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- 1. STAFF & VERIFICATION ROUTES ---
Route::prefix('staff')->group(function () {
    // Fetch all residents for staff management
    Route::get('/residents', [StaffController::class, 'index']);
    // Update verification status (Approve/Reject)
    Route::put('/residents/{id}/status', [StaffController::class, 'updateStatus']);
});

// Required for frontend verificationService.getSubmissions()
Route::get('/submissions', [StaffController::class, 'index']);


// --- 2. PUBLIC & REGISTRATION ---
Route::post('/register', [RegistrationController::class, 'register']);
Route::get('/track/{trackingNumber}', [RegistrationController::class, 'track']);
Route::post('/check-household', [RegistrationController::class, 'checkHousehold']);
Route::get('/households/check-head', [RegistrationController::class, 'checkHousehold']);


// --- 3. RESIDENT MANAGEMENT (RBI) ---
// These MUST use ResidentController to manage existing records
Route::get('/residents', [ResidentController::class, 'index']); 
Route::put('/residents/{id}', [ResidentController::class, 'update']);
Route::delete('/residents/{id}', [ResidentController::class, 'destroy']);


// --- 4. ACTIONS & UTILITIES ---
// This handles the status update/approval outside the staff prefix if needed
Route::put('/residents/{id}/status', [StaffController::class, 'updateStatus']);

Route::get('/locations', [LocationController::class, 'index']);
Route::get('/barangay-id/{barangay_id}', [BarangayIDController::class, 'show']);

// Household Management
Route::get('/households', [HouseholdController::class, 'index']);

// Data Integrity Debugger
Route::get('/debug-households', function() {
    return [
        'total_households' => \App\Models\Household::count(),
        'households_with_residents' => \App\Models\Household::whereHas('residents')->count(),
        'all_residents_count' => \App\Models\Resident::count(),
        'residents_without_household' => \App\Models\Resident::whereNull('household_id')->count(),
    ];
});


// --- 5. DASHBOARD ANALYTICS ROUTES ---
Route::prefix('analytics')->group(function () {
    Route::get('/overview', OverviewController::class);
    Route::get('/demographics', DemographicsController::class);
    Route::get('/sectors', SectorsController::class);
    Route::get('/registration', AnalyticsReg::class);
    Route::get('/livelihood', LivelihoodController::class);    
    Route::get('/heatmap', HeatmapController::class);
    Route::get('/insights', InsightsController::class);
    
    // Combined analytics data
    Route::get('/all', AnalyticsController::class);
});