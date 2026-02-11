<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purok extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'name'
    ];

    public function streets()
    {
        return $this->hasMany(Street::class, 'purok_id');
    }

   
    public function households()
    {
        return $this->hasMany(Household::class, 'purok_id');
    }

  
    public function residents()
    {
        return $this->hasMany(Resident::class, 'temp_purok_id');
    }
}