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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse {
        return response()->json($this->orderService->createOrder($request));
    }

    /**
     * @param $userId
     * @return JsonResponse
     */
    public function unpaidOrders($userId): JsonResponse {
        return response()->json($this->orderService->fetchUnpaidOrders($userId));
    }

    public function orderList(Request $request) {
        $orderList = $this->orderService->filterOrderList($request->query());
        return response()->json($orderList);

        return view('admin.order.index', ['orders' => $orderList]);
    }

    public function markAllTicketsAsUsed($orderId) {
        return response()->json($this->orderService->updateOrderTicketsStatus($orderId));
    }
}
