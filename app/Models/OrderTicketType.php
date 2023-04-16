<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTicketType extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = [
        'order_id',
        'ticket_type_id',
        'quantity',
    ];
}
