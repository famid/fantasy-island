<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OrderSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('orders')->insert([
            [
                'id' => 1,
                'user_id' => 2,
                'purchase_date' => Carbon::tomorrow(),
                'payment_type' => 1,
                'amount' => 1000,
                'remaining_game' => 5,
                'quantity' => 5,
                'payment_status' => ACTIVE_STATUS,
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'purchase_date' => Carbon::tomorrow(),
                'payment_type' => 1,
                'amount' => 1000,
                'remaining_game' => 5,
                'quantity' => 5,
                'payment_status' => PENDING_STATUS,
            ]
        ]);
    }
}
