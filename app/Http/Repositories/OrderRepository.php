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

    /**
     * @param int $orderId
     * @return mixed
     */
    public function validOrder(int $orderId): mixed
    {
        return $this->model::where('id', $orderId)
            ->where('payment_status', ACTIVE_STATUS)
            ->where('remaining_game', '>', 0)
            ->first();
    }
}
