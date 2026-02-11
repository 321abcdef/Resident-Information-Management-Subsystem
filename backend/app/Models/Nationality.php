<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Nationality extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function residents()
    {
        return $this->hasMany(Resident::class);
    }
}