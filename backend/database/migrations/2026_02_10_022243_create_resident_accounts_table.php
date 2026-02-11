<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidentAccountsTable extends Migration
{
    public function up()
    {
        Schema::create('resident_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->unique()->constrained()->onDelete('cascade');
            
            // USERNAME = BARANGAY_ID (e.g., BGN-00001)
            $table->string('username', 50)->unique(); 
            $table->string('password', 255);
            
            $table->timestamp('last_login_at')->nullable();
            $table->boolean('must_change_password')->default(true);
            $table->boolean('is_active')->default(true);
            
            $table->timestamps();
            
            $table->index('username');
        });
    }

    public function down()
    {
        Schema::dropIfExists('resident_accounts');
    }
}
