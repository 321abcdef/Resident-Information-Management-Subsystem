<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',      
        'email',      
        'resident_id',
        'username',
        'password',
        'qr_token',
        'role',      
        'last_login_at',
        'must_change_password',
        'is_active',
        'remember_token'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime', 
        'last_login_at' => 'datetime',
        'must_change_password' => 'boolean',
        'is_active' => 'boolean',
        'password' => 'hashed',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class, 'resident_id');
    }
}