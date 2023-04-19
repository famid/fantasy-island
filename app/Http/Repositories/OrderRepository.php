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
    public function validOrder(int $orderId): mixed {
        return $this->model::where('id', $orderId)
            ->where('payment_status', ACTIVE_STATUS)
            ->where('remaining_game', '>', 0)
            ->first();
    }

    public function fetchUserUnpaidOrderList($userId) {
        return $this->model::where('user_id', $userId)
            ->where('purchase_date', '>=', now())
            ->where('payment_status', PENDING_STATUS)
            ->get();
    }

    /**
     * @param $userId
     * @return mixed
     */
    public function getTotalQuantityAndRemainingGameForUser($userId): mixed {
        return $this->model::where('user_id', $userId)
            ->where('payment_status', ACTIVE_STATUS)
            ->selectRaw('SUM(quantity) as total_quantity, SUM(remaining_game) as remaining_game')
            ->first();
    }
}
