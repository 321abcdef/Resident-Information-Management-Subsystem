<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Street extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'purok_id'
    ];


    public function purok()
    {
        return $this->belongsTo(Purok::class, 'purok_id');
    }

    public function households()
    {
        return $this->hasMany(Household::class, 'street_id');
    }
}