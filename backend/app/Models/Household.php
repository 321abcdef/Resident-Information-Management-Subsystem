<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Household extends Model
{
    use HasFactory;

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
     * Ito ang "tulay" para gumana ang household.purok
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
     * Isang household, maraming residents
     */
    public function residents()
    {
        return $this->hasMany(Resident::class, 'household_id');
    }

    /**
     * Ang Head of Family ay isang Resident din
     */
    public function headResident()
    {
        return $this->belongsTo(Resident::class, 'head_resident_id');
    }
}