<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResidentController;

// ✅ THESE MUST EXIST:
Route::post('/register', [ResidentController::class, 'register']);
Route::get('/residents', [ResidentController::class, 'index']);
Route::put('/residents/{id}', [ResidentController::class, 'updateStatus']);
Route::get('/track/{trackingNumber}', [ResidentController::class, 'track']);
Route::post('/check-household', [ResidentController::class, 'checkHousehold']);