<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('residents', function (Blueprint $table) {
       $table->id();
$table->string('first_name');
$table->string('middle_name')->nullable();
$table->string('last_name');
$table->string('suffix')->nullable();
$table->date('birthdate');
$table->integer('age');
$table->string('gender');
$table->string('house_number');
$table->string('purok');
$table->string('street');
$table->string('contact');
$table->string('id_front_path');
$table->string('id_back_path');
$table->string('tracking_number')->unique();
$table->string('status')->default('PENDING');
$table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
