<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHouseholdsTable extends Migration
{
    public function up()
    {
        Schema::create('households', function (Blueprint $table) {
            $table->id();
            $table->string('household_id', 50)->unique(); // Auto-generated
            $table->string('house_number', 50);
            $table->foreignId('purok_id')->constrained();
            $table->foreignId('street_id')->constrained();
            
            // Head of Family tracking
            $table->foreignId('head_resident_id')->nullable()
                  ->constrained('residents')->onDelete('set null');
            
            $table->date('established_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Unique address combination
            $table->unique(['house_number', 'street_id', 'purok_id'], 'unique_address');
            $table->index('head_resident_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('households');
    }
}