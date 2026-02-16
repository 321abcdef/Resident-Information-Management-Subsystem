<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Resident extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'barangay_id', 'tracking_number', 'first_name', 'middle_name', 'last_name', 'suffix',
        'birthdate', 'birth_registration', 'gender', 'contact_number', 'email',
        'household_id', 'household_position', 'marital_status_id', 'nationality_id',
        'sector_id', 'residency_status', 'residency_start_date', 'is_voter',
        'id_type', 'id_front_path', 'id_back_path', 'status', 'temp_password',
        'verified_at', 'verified_by', 'rejection_reason',
        'temp_house_number', 'temp_purok_id', 'temp_street_id'
    ];

    protected $casts = [
        'birthdate' => 'date',
        'residency_start_date' => 'date',
        'verified_at' => 'datetime',
        'is_voter' => 'boolean'
    ];

    protected $hidden = ['temp_password'];

    // Para awtomatikong isama ang name sa JSON response
    protected $appends = ['name', 'age'];

    /** ACCESSORS **/
    
    // Format: FIRST M. LAST SUFFIX
    public function getNameAttribute() {
        $middleInitial = $this->middle_name ? ' ' . strtoupper(substr($this->middle_name, 0, 1)) . '.' : '';
        $suffix = $this->suffix ? ' ' . $this->suffix : '';
        return trim($this->first_name . $middleInitial . ' ' . $this->last_name . $suffix);
    }

    public function getAgeAttribute() {
        return $this->birthdate ? Carbon::parse($this->birthdate)->age : 'N/A';
    }

    /** RELATIONSHIPS **/

    public function household() { return $this->belongsTo(Household::class, 'household_id'); }
    public function tempPurok() { return $this->belongsTo(Purok::class, 'temp_purok_id'); }
    public function tempStreet() { return $this->belongsTo(Street::class, 'temp_street_id'); }
    public function maritalStatus() { return $this->belongsTo(MaritalStatus::class, 'marital_status_id'); }
    public function nationality() { return $this->belongsTo(Nationality::class, 'nationality_id'); }
    public function sector() { return $this->belongsTo(Sector::class, 'sector_id'); }
    public function employmentData() { return $this->hasOne(EmploymentData::class, 'resident_id'); }
    public function educationData() { return $this->hasOne(EducationData::class, 'resident_id'); }
    public function account() { return $this->hasOne(ResidentAccount::class, 'resident_id'); }
}