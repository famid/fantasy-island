<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        if (env("APP_ENV") == "production") {
            $this->call(AdminUserSeeder::class);
            $this->call(TicketTypeSeeder::class);
        } else {
            $this->call(AdminUserSeeder::class);
            $this->call(UserSeeder::class);
            $this->call(TicketTypeSeeder::class);
            $this->call(OrderSeeder::class);
        }
    }
}
