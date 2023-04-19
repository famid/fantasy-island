<?php

namespace App\Http\Services\Order;


use App\Http\Repositories\OrderRepository;
use App\Http\Services\Boilerplate\BaseService;
use Exception;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class OrderService extends BaseService {

     /**
     * @var OrderRepository
     */
    private OrderRepository $orderRepository;

     /**
     * OrderService constructor.
     * @param OrderRepository $orderRepository
     */
    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    /**
     * @param object $request
     * @return array
     */
    public function createOrder(object $request) :array {
        try {
            $createOrderResponse = $this->orderRepository->create(
                $this->preparedCreateOrderData($request)
            );

            return !$createOrderResponse ?
                $this->response()->error() :
                $this->response($createOrderResponse)->success('Order is created successfully');
        } catch(QueryException $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param object $request
     * @return array
     */
    private function preparedCreateOrderData (object $request) :array {
        return [
            'user_id' => $request->user_id,
            //'purchase_date' => Carbon::parse($request->purchase_date),
            // 'purchase_date' => Carbon::parse($request->purchase_date, 'Asia/Dhaka')->setTimezone('UTC'),
            'purchase_date'=> Carbon::parse($request->purchase_date)->timezone('GMT'),
            'amount' => $request->amount,
            'remaining_game' => $request->quantity,
            'quantity' => $request->quantity,
            // 'payment_status' => ACTIVE_STATUS,
        ];
    }

    /**
     * @param $orderId
     * @return array
     */
    public function updatePaymentStatus($orderId): array
    {
        try {
            $order = $this->orderRepository->firstWhere(['id' => $orderId]);
            if(!$order || $order->payment_status == ACTIVE_STATUS) {
                return $this->response()->error("Order not found or Payment is already done.");
            }

            $updatePaymentStatus = $this->orderRepository->updateWhere(['id' => $orderId], [
                'payment_status' => ACTIVE_STATUS
            ]);

            return !$updatePaymentStatus ?
                $this->response()->error("Order payment status is not updated") :
                $this->response($order)->success("Order payment status is updated successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param int $orderId
     * @return array
     */
    public function decrementRemainingGame(int $orderId): array {
        try {
            $order = $this->orderRepository->validOrder($orderId);

            if (!$order) return $this->response()->error("Order not found");

            return !$order->decrement('remaining_game') ?
                $this->response()->error("remaining game is not updated") :
                $this->response($order)->success("Remaining game is updated successfully");
        } catch (Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $userId
     * @return array
     */
    public function fetchUnpaidOrders($userId): array{
        try {
            $orders = $this->orderRepository->fetchUserUnpaidOrderList($userId);
            if($orders->isEmpty()) return $this->response()->error("No Order is founded!");

            return $this->response($orders)->success("Unpaid Orders are founded successfully.");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $userId
     * @return array
     */
    public function fetchUserGamePlayInfo($userId): array{
        try {
            $gamePlayInfo = $this->orderRepository->getTotalQuantityAndRemainingGameForUser($userId);
            if(!$gamePlayInfo) return $this->response()->error("No game info is founded yet!");

            return $this->response($gamePlayInfo)->success("User gameplay info.");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }
}
