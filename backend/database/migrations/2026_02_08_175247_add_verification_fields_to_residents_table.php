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
    Schema::table('residents', function (Blueprint $table) {
        if (!Schema::hasColumn('residents', 'barangay_id')) {
            $table->string('barangay_id')->nullable()->after('id');
        }
        if (!Schema::hasColumn('residents', 'status')) {
            $table->string('status')->default('Pending')->after('barangay_id');
        }
        if (!Schema::hasColumn('residents', 'temp_password')) {
            $table->string('temp_password')->nullable()->after('status');
        }
        if (!Schema::hasColumn('residents', 'verified_at')) {
            $table->timestamp('verified_at')->nullable()->after('temp_password');
        }
    });
}
};
