<?php

namespace App\Http\Controllers;

use App\Http\Services\Order\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller {

    /**
     * @var OrderService
     */
    private OrderService $orderService;

    /**
     * @param OrderService $orderService
     */
    public function __construct(OrderService $orderService) {
        $this->orderService = $orderService;
    }

    public function store(Request $request): JsonResponse {
        return response()->json($this->orderService->createOrder($request));
    }
}
