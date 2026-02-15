<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sector extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'description', 
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function residents()
    {
        return $this->hasMany(Resident::class, 'sector_id');
    }
}