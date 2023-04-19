<?php

namespace App\Http\Repositories;

use App\Models\Ticket;

class TicketRepository extends BaseRepository {

    /**
     * TicketRepository constructor.
     * @param Ticket $ticket
     */
    public function __construct(Ticket $ticket) {
        parent::__construct($ticket);
    }

    public function fetchTicketsByOrderId($orderId) {
        return $this->model::select('tickets.*', 'users.name', 'users.phone', 'orders.payment_status', 'orders.order_id')
            ->join('orders', 'orders.id', '=', 'tickets.order_id')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->where('tickets.order_id', '=', $orderId)
            ->where('orders.payment_status', '=', ACTIVE_STATUS)
            ->where('tickets.ticket_used_status', '=', TICKET_UNUSED_STATUS)
            ->get();
    }
}
