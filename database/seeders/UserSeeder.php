<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('users')->insert([
            [
                'id' => 2,
                'name' => "user 1",
                'phone' => "01793851981",
                'password' => Hash::make('12345678'),
                'role' => USER_ROLE,
                'is_phone_verified' => ACTIVE_STATUS,
                'status' => USER_ACTIVE
            ],
            [
                'id' => 3,
                'name' => "user 2",
                'phone' => "01793851982",
                'password' => Hash::make('12345678'),
                'role' => USER_ROLE,
                'is_phone_verified' => ACTIVE_STATUS,
                'status' => USER_ACTIVE
            ]
        ]);
    }
}
