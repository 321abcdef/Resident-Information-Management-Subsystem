<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Household extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'household_id',     // HH-XXXXX
        'house_number',
        'purok_id',
        'street_id',
        'head_resident_id',
        'established_date',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'established_date' => 'date'
    ];

    /**
     * Household belongs to a Purok
     */
    public function purok() 
    {
        return $this->belongsTo(Purok::class, 'purok_id');
    }

    /**
     * Household belongs to a Street
     */
    public function street() 
    {
        return $this->belongsTo(Street::class, 'street_id');
    }

    /**
     */
    public function residents()
    {
        return $this->hasMany(Resident::class, 'household_id');
    }

    /**
     */
    public function headResident()
    {
        return $this->belongsTo(Resident::class, 'head_resident_id');
    }
}