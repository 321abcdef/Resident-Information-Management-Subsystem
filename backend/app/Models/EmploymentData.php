<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmploymentData extends Model
{
    use HasFactory;
    protected $table = 'employment_data';
    protected $fillable = [
        'resident_id', 'employment_status', 'occupation', 'employer_name',
        'work_address', 'business_name', 'business_type', 'business_status',
        'income_source', 'monthly_income', 'income_bracket'
    ];

    public function resident() { return $this->belongsTo(Resident::class); }
}