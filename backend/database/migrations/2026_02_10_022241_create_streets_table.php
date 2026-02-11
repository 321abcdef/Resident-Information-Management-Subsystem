<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('streets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purok_id')->constrained()->onDelete('cascade');
            $table->string('name', 100);
            $table->timestamps();
            
            $table->index('purok_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('streets');
    }
};