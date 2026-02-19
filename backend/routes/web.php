<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Staff\StaffController;

Route::get('/', function () {
    return view('welcome');
});

// routes/web.php
Route::get('/v/{trackingNumber}', [StaffController::class, 'publicVerify']);
