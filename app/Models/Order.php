<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'user_id',
        'purchase_date',
        'amount',
        'payment_type',
        'remaining_game',
        'quantity',
        'payment_status',
    ];
}
