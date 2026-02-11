<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentsTable extends Migration
{
    public function up()
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            
            // === IDENTITY ===
            $table->string('barangay_id', 50)->unique()->nullable(); 
            // Pattern: BGN-00001 (created ONLY after approval)
            
            $table->string('tracking_number', 50)->unique(); 
            // Pattern: BGN-XXXX (created during registration)
            
            // === PERSONAL INFO ===
            $table->string('first_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100);
            $table->string('suffix', 10)->nullable(); // Jr., Sr., III
            $table->date('birthdate');
            $table->enum('gender', ['Male', 'Female']);
            
            // === CONTACT ===
            $table->string('contact_number', 11); // 09XXXXXXXXX
            $table->string('email', 100)->nullable();
            
            // === HOUSEHOLD LINK ===
            $table->foreignId('household_id')->nullable()
                  ->constrained()->onDelete('set null');
            
            $table->enum('household_position', [
                'Head of Family',
                'Spouse', 
                'Son', 
                'Daughter',
                'Relative',
                'Househelp',
                'Others'
            ]);
            
            // === CIVIL STATUS ===
            $table->foreignId('marital_status_id')->nullable()
                  ->constrained()->onDelete('set null');
            
            $table->foreignId('nationality_id')->default(1) // Filipino
                  ->constrained();
            
            // === PRIMARY SECTOR (ONE ONLY) ===
            $table->foreignId('sector_id')->nullable()
                  ->constrained()->onDelete('set null');
            
            // === RESIDENCY ===
            $table->enum('residency_status', ['Current Resident', 'New Resident'])
                  ->default('New Resident');
            $table->date('residency_start_date')->nullable();
            $table->boolean('is_voter')->default(false);
            
            // === ID VERIFICATION ===
            $table->string('id_type', 50)->nullable(); // "Driver's License", "Passport"
            $table->string('id_front_path', 255);
            $table->string('id_back_path', 255);
            
            // === ACCOUNT STATUS ===
            $table->enum('status', [
                'Pending',
                'For Verification', 
                'Verified',
                'Rejected'
            ])->default('Pending');
            
            $table->string('temp_password', 255)->nullable(); 
            // Encrypted, for first login
            
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()
                  ->constrained('users')->onDelete('set null');
            
            $table->text('rejection_reason')->nullable();
            
            $table->timestamps();
            $table->softDeletes(); // For archiving instead of hard delete
            
            // === INDEXES ===
            $table->index('barangay_id');
            $table->index('tracking_number');
            $table->index('status');
            $table->index('household_id');
            $table->index(['last_name', 'first_name']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('residents');
    }
}