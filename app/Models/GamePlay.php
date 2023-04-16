<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GamePlay extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'user_id',
        'order_id',
        'is_finished',
        'playtime',
    ];

    // Accessor to convert time format to min:sec:ms

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

    // Mutator to convert min:sec:ms format to time in milliseconds

    /**
     * @param $value
     * @return void
     */
    public function setPlaytimeAttribute($value): void
    {
        list($minutes, $seconds, $ms) = explode(':', $value);
        $this->attributes['playtime'] = (($minutes * 60000) + ($seconds * 1000) + $ms);
    }
}
