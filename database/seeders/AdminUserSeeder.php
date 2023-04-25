<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => "Admin",
                'role' => ADMIN_ROLE,
                'email' => "admin@email.com",
                'email_verified_at' => Carbon::now(),
                'status' => ACTIVE_STATUS,
                'password' => Hash::make('12345678'),
            ]
        ]);
    }
}
