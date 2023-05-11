<?php

namespace App\Http\Repositories;

use App\Models\TicketType;

class TicketTypeRepository extends BaseRepository {

    /**
     * TicketTypeRepository constructor.
     * @param TicketType $ticketType
     */
    public function __construct(TicketType $ticketType) {
        parent::__construct($ticketType);
    }
}
