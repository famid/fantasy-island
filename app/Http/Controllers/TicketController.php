<?php

namespace App\Http\Controllers;

use App\Http\Services\TicketService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * @var TicketService
     */
    private TicketService $ticketService;

    public function __construct(TicketService $ticketService) {
        $this->ticketService = $ticketService;
    }

    /**
     * @param $orderId
     * @return JsonResponse
     */
    public function orderTicketsInfo($orderId): JsonResponse {
        return response()->json($this->ticketService->fetchOrderTicketsInfo($orderId));
    }
}
