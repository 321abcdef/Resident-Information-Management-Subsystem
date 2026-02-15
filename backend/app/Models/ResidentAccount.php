<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ResidentAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'username',
        'password',
        'last_login_at',
        'must_change_password',
        'is_active'
    ];

    protected $hidden = [
        'password'
    ];

    protected $casts = [
        'last_login_at' => 'datetime',
        'must_change_password' => 'boolean',
        'is_active' => 'boolean'
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}