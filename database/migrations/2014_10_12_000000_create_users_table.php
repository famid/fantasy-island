<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->tinyInteger('role')->default(USER_ROLE);
            $table->string('email', 191)->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 191);
            $table->string('phone',25)->nullable();
            $table->integer('phone_verification_code')->nullable();
            $table->timestamp('phone_verification_expiry')->nullable();
            $table->tinyInteger('is_phone_verified')->default(PENDING_STATUS);
            $table->tinyInteger('status')->default(USER_INACTIVE);
            $table->unsignedInteger('total_playable_game')->default(0);
            $table->unsignedInteger('remaining_game')->default(0);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
