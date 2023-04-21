<?php

namespace App\Http\Repositories;

use App\Models\Order;
use Illuminate\Support\Facades\DB;

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

    private function buildGetOrderQuery(): mixed {
        $ticketsSubquery = DB::table('tickets')
            ->select('order_id', DB::raw('GROUP_CONCAT(unique_code) as unique_code'), DB::raw('GROUP_CONCAT(available_date) as available_dates'), DB::raw('GROUP_CONCAT(ticket_used_status) as ticket_used_statuses'))
            ->groupBy('order_id');

        return $this->model::join('users', 'orders.user_id', '=', 'users.id')
            ->leftJoinSub($ticketsSubquery, 'tickets', function ($join) {
                $join->on('orders.id', '=', 'tickets.order_id');
            })
            ->select('orders.*', 'users.name', 'users.phone', 'tickets.unique_codes', 'tickets.available_dates', 'tickets.ticket_used_statuses')
            ->groupBy('orders.id');
    }

    /**
     * @param $queries
     * @return mixed
     */
    public function fetchOrderList($queries): mixed {
//        $query = $this->model::with('tickets')
//            ->join('users', 'orders.user_id', '=', 'users.id')
//            ->leftJoin('tickets', 'orders.id', '=', 'tickets.order_id')
//            ->select('orders.*', 'users.name', 'users.phone', 'tickets.id as ticket_id', 'tickets.unique_code', 'tickets.available_date', 'tickets.ticket_used_status')
//            ->groupBy('orders.id', 'users.name', 'users.phone', 'tickets.id', 'tickets.unique_code', 'tickets.available_date', 'tickets.ticket_used_status')
//            ->orderByDesc('orders.id');
//
//        if (!empty($queries['name'])) {
//            $query->where('users.name', 'like', '%'.$queries['name'].'%');
//        }
//        if (!empty($queries['phone'])) {
//            $query->where('users.phone', $queries['phone']);
//        }
//        if (!empty($queries['payment_status'])) {
//            $query->where('orders.payment_status', $queries['payment_status']);
//        }
//        if (!empty($queries['ticket_unique_code'])) {
//            $query->where('tickets.unique_code', $queries['ticket_unique_code']);
//        }
//
//        return $query->paginate(10);

        $query = $this->model::with('tickets')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('tickets', 'orders.id', '=', 'tickets.order_id')
            ->select(
                'orders.id',
                'orders.payment_status',
                'users.name',
                'users.phone',
                'tickets.id as ticket_id',
                'tickets.unique_code',
                'tickets.ticket_used_status'
            )
            ->groupBy('orders.id', 'users.name', 'users.phone', 'tickets.id', 'tickets.unique_code', 'tickets.available_date', 'tickets.ticket_used_status')
            ->orderByDesc('orders.id');

        if (!empty($queries['name'])) {
            $query->where('users.name', 'like', '%'.$queries['name'].'%');
        }
        if (!empty($queries['phone'])) {
            $query->where('users.phone', $queries['phone']);
        }
        if (!empty($queries['payment_status'])) {
            $query->where('orders.payment_status', $queries['payment_status']);
        }
        if (!empty($queries['ticket_unique_code'])) {
            $query->where('tickets.unique_code', $queries['ticket_unique_code']);
        }

        return $query->paginate(10);
    }
}
