<?php

namespace App\Models;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'role',
        'email',
        'email_verified_at',
        'password',
        'phone',
        'phone_verification_code',
        'is_phone_verified',
        'status',
        'total_playable_game',
        'remaining_game',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @param $value
     * @return string
     */
    public function getPlaytimeAttribute($value): string
    {
        $minutes = floor($value / 60000);
        $seconds = floor(($value - $minutes * 60000) / 1000);
        $ms = $value - ($minutes * 60000) - ($seconds * 1000);
        return sprintf('%02d:%02d:%03d', $minutes, $seconds, $ms);
    }
}
