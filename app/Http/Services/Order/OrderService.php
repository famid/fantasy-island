<?php

namespace App\Http\Services\Order;


use App\Http\Repositories\OrderRepository;
use App\Http\Services\Boilerplate\BaseService;
use Exception;
use Illuminate\Database\QueryException;

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
     * @param $request
     * @return array
     */
    public function createOrder(object $request) :array {
        try {
            $createOrderResponse = $this->repository->create(
                $this->preparedCreateOrderData($request)
            );

            return !$createOrderResponse ?
                $this->response()->error() :
                $this->response()->success('Order is created successfully');
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
            'purchase_date' => $request->purchase_date,
            'amount' => $request->amount,
            'game_plays_total' => $request->quantity,
            'quantity' => $request->quantity,
            'payment_status' => ACTIVE_STATUS,
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
                $this->response()->success("Order payment status is updated successfully");
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
                $this->response()->success("Remaining game is updated successfully");
        } catch (Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }
}
