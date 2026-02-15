<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Resident\RegistrationController;
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\LocationController;

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
Route::delete('/residents/{id}', [ResidentController::class, 'destroy']);

// 4. ACTION
Route::put('/residents/{id}/status', [StaffController::class, 'updateStatus']);

Route::get('/locations', [LocationController::class, 'index']);

