<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Resident\RegistrationController;
use App\Http\Controllers\Staff\StaffController;

/*
|--------------------------------------------------------------------------
| Resident Routes (No Login - For Signup/Tracking)
|--------------------------------------------------------------------------
*/
Route::post('/register', [RegistrationController::class, 'register']);
Route::get('/track/{trackingNumber}', [RegistrationController::class, 'track']);
Route::post('/check-household', [RegistrationController::class, 'checkHousehold']);

/*
|--------------------------------------------------------------------------
| Staff Routes (For Management - Put Middleware soon)
|--------------------------------------------------------------------------
*/

Route::get('/residents', [StaffController::class, 'index']);

// View specific resident details
Route::get('/residents/{id}', [StaffController::class, 'show']);

// Approve / Reject / Update Status
Route::put('/residents/{id}', [StaffController::class, 'updateStatus']);
// routes/api.php

// Publicly accessible route for QR scanning
Route::get('/residents/verify-public/{barangay_id}', [App\Http\Controllers\Staff\StaffController::class, 'publicVerify']);