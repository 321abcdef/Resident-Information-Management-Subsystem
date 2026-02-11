<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EducationData extends Model
{
    use HasFactory;
    protected $table = 'education_data';
    protected $fillable = [
        'resident_id', 'educational_status', 'school_type', 'school_level',
        'school_name', 'course_program', 'highest_grade_completed'
    ];

    public function resident() { return $this->belongsTo(Resident::class); }
}