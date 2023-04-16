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
}
