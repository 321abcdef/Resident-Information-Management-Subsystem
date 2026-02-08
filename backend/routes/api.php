<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResidentController;

Route::post('/register', [ResidentController::class, 'register']);
Route::get('/track/{number}', [ResidentController::class, 'track']);
Route::get('/residents', [ResidentController::class, 'index']);
Route::put('/residents/{id}', [ResidentController::class, 'updateStatus']);