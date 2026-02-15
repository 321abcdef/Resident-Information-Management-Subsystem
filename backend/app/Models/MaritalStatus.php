<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MaritalStatus extends Model
{
    use HasFactory;

    protected $table = 'marital_statuses';

    protected $fillable = ['name'];

    public function residents()
    {
        return $this->hasMany(Resident::class, 'marital_status_id');
    }
}