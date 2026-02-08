<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resident extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     * Setting this to empty array allows all fields to be saved.
     */
    protected $guarded = [];
}