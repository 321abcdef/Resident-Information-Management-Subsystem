<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferenceDataSeeder extends Seeder
{
    public function run()
    {
        // PUROKS
        $puroks = [];
        for ($i = 1; $i <= 7; $i++) {
            $puroks[] = ['number' => (string)$i, 'name' => "Purok $i", 'created_at' => now(), 'updated_at' => now()];
        }
        DB::table('puroks')->insert($puroks);

        // STREETS
        $streetMapping = [
            1 => ["Sisa St.", "Crisostomo St."],
            2 => ["Ibarra St.", "Elias St."],
            3 => ["Maria Clara St.", "Basilio St."],
            4 => ["Salvi St.", "Victoria St."],
            5 => ["Tiago St.", "Tasio St."],
            6 => ["Guevarra St.", "Sinang St."],
            7 => ["Alfarez St.", "Doña Victorina St."]
        ];

        foreach ($streetMapping as $purokNum => $streets) {
            $purokId = DB::table('puroks')->where('number', $purokNum)->value('id');
            foreach ($streets as $street) {
                DB::table('streets')->insert([
                    'purok_id' => $purokId,
                    'name' => $street,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        // SECTORS
        $sectors = [
            ['name' => 'General Population', 'description' => 'Standard residents', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Senior Citizen', 'description' => '60 years old and above', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'PWD', 'description' => 'Person with Disability', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Solo Parent', 'description' => 'Single parent household', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Student', 'description' => 'Currently enrolled in school', 'created_at' => now(), 'updated_at' => now()]
        ];
        DB::table('sectors')->insert($sectors);

        // MARITAL STATUS
        $statuses = ['Single', 'Married', 'Widowed', 'Separated', 'Divorced'];
        foreach ($statuses as $status) {
            DB::table('marital_statuses')->insert([
                'name' => $status,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // NATIONALITIES
        DB::table('nationalities')->insert([
            ['name' => 'Filipino', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'American', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Chinese', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Japanese', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Korean', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
