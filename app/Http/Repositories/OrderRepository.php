<?php

namespace App\Http\Repositories;

use App\Models\Order;

class OrderRepository extends BaseRepository {

    /**
     * OrderRepository constructor.
     * @param Order $order
     */
    public function __construct(Order $order) {
        parent::__construct($order);
    }
}
