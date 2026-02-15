<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationDataTable extends Migration
{
    public function up()
    {
        Schema::create('education_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained()->onDelete('cascade');
            
            $table->enum('educational_status', [
                'Currently Studying',
                'Graduated',
                'Not Studying',
                'N/A'
            ])->default('N/A');
            
            // FOR STUDENTS
            $table->enum('school_type', ['Public', 'Private', 'N/A'])->default('N/A');
            $table->enum('school_level', [
                'Elementary',
                'Junior High School',
                'Senior High School',
                'College',
                'Vocational',
                'Graduate School',
                'N/A'
            ])->default('N/A');
            
            $table->string('school_name', 200)->nullable();
            $table->string('course_program', 200)->nullable();
            
            // HIGHEST EDUCATION ATTAINED
            $table->enum('highest_grade_completed', [
                'No Formal Education',
                'Elementary Undergraduate',
                'Elementary Graduate',
                'High School Undergraduate',
                'High School Graduate',
                'College Undergraduate',
                'College Graduate',
                'Vocational Graduate',
                'Post Graduate',
                'N/A'
            ])->default('N/A');
            
            $table->timestamps();
            
            $table->index('resident_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('education_data');
    }
}