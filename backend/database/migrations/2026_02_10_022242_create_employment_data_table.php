<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmploymentDataTable extends Migration
{
    public function up()
    {
        Schema::create('employment_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained()->onDelete('cascade');
            
            $table->enum('employment_status', [
                'Employed',
                'Self-Employed',
                'Unemployed',
                'Student',
                'Retired',
                'N/A'
            ])->default('N/A');
            
            // FOR EMPLOYED
            $table->string('occupation', 100)->nullable();
            $table->string('employer_name', 200)->nullable();
            $table->string('work_address', 255)->nullable();
            
            // FOR SELF-EMPLOYED
            $table->string('business_name', 200)->nullable();
            $table->string('business_type', 100)->nullable();
            $table->enum('business_status', [
                'Operating',
                'Temporarily Closed',
                'Closed',
                'N/A'
            ])->default('N/A');
            
            // INCOME
            $table->enum('income_source', [
                'Salary',
                'Business',
                'Pension',
                'Remittance',
                'Others',
                'N/A'
            ])->default('N/A');
            
            $table->decimal('monthly_income', 10, 2)->nullable();
            $table->enum('income_bracket', [
                'Below 10,000',
                '10,000 - 20,000',
                '20,001 - 30,000',
                '30,001 - 50,000',
                'Above 50,000',
                'N/A'
            ])->default('N/A');
            
            $table->timestamps();
            
            $table->index('resident_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('employment_data');
    }
}
