<?php

namespace App\Http\Repositories;

use App\Models\OrderTicketType;

class OrderTicketTypeRepository extends BaseRepository {

    /**
     * OrderTicketTypeRepository constructor.
     * @param OrderTicketType $orderTicketType
     */
    public function __construct(OrderTicketType $orderTicketType) {
        parent::__construct($orderTicketType);
    }
}
