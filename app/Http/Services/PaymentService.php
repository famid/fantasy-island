<?php

namespace App\Http\Services;


use App\Http\Repositories\OrderRepository;
use App\Http\Services\Boilerplate\BaseService;
use App\Http\Services\Order\OrderService;
use DGvai\SSLCommerz\SSLCommerz;
use Exception;
use Illuminate\Support\Facades\DB;

class PaymentService extends BaseService {

     /**
     * @var OrderRepository
     */
    private OrderRepository $orderRepository;
    private OrderService $orderService;
    private TicketService $ticketService;
    private $userService;

    /**
     * PaymentService constructor.
     * @param OrderRepository $orderRepository
     */
    public function __construct(
        OrderRepository $orderRepository,
        OrderService $orderService,
        TicketService $ticketService,
        UserService $userService
    ) {
        $this->orderRepository = $orderRepository;
        $this->orderService = $orderService;
        $this->ticketService = $ticketService;
        $this->userService = $userService;
    }

    /**
     * @param $orderId
     * @return array
     */
    public function makePayment($orderId): array {
        try {
            $order = $this->orderRepository->firstWhere(['id' => $orderId]);
            if($this->isOrderAlreadyPaid($order)) return $this->response()->error("This order payment is already done");

            $getPaymentUrlResponse = $this->getPaymentUrl($order);

            if(!$getPaymentUrlResponse['success']) return $getPaymentUrlResponse;

            return $getPaymentUrlResponse;
        } catch (Exception $e){
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $order
     * @return array
     */
    private function getPaymentUrl($order): array {
        try {
            $sslc = new SSLCommerz();
            $sslc->amount($order->amount)
                ->trxid('DEMOTRX123')
                ->product('Demo Product Name')
                ->customer('Customer Name','custemail@email.com')
                ->setExtras($order->id);
            $sslPaymentResponse = $sslc->make_payment(true);
            $sslPaymentDecodeResponse = json_decode($sslPaymentResponse, true);

            return $this->response($sslPaymentDecodeResponse)->success("Payment url is generated successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param mixed $order
     * @return bool
     */
    private function isOrderAlreadyPaid(mixed $order): bool {
        return False;
    }

    /**
     * @param $request
     * @return array
     */
    public function paymentSuccess($request): array {
        try {
            $validate = SSLCommerz::validate_payment($request);
            if(!$validate) return $this->response()->error("Orders payment is failed");

            return $this->updateOrderAndGenerateTicketAndGame($request->value_a);
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }

    private function updateOrderAndGenerateTicketAndGame($orderId): array {
        try {
            DB::beginTransaction();
            $updateOrderStatus = $this->orderService->updatePaymentStatus($orderId);
            if(!$updateOrderStatus['success']) throw new Exception("Order payment status is not updated");

            $order = $updateOrderStatus['data'];
            $updateUserPlayableGame = $this->userService->updatePlayableGame($order->user_id, $order->quantity);
            if(!$updateUserPlayableGame['success']) throw new Exception($updateUserPlayableGame['message']);

            $createTicketResponse = $this->ticketService->insertTickets($updateOrderStatus['data']);
            if(!$createTicketResponse['success']) throw new Exception($createTicketResponse['message']);

            DB::commit();
            return $this->response()->success("Tickets are saved successfully");
        } catch (Exception $e) {

            DB::rollBack();
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $request
     * @return array
     */
    public function manualPaymentOperation($request) {
        try {
            $order = $this->orderRepository->firstWhere([
                'id' => $request->order_id,
                'user_id' => $request->user_id,
                'payment_status' => PENDING_STATUS
            ]);
            if(!$order) return $this->response()->error("No order is founded.");

            DB::beginTransaction();
            $saveManualPaymentInfo = $this->orderRepository->updateWhere(['id' => $order->id],
                [
                    'payment_system' => $request->payment_system,
                    'client_phone' => $request->client_phone,
                    'transaction_id' => $request->transaction_id,
                    'merchant_account_phone' => $request->merchant_account_phone,
                ]
            );
            if(!$saveManualPaymentInfo) throw new Exception("Order payment info does not save!");

            $processOrderResponse = $this->updateOrderAndGenerateTicketAndGame($request->order_id);
            if(!$processOrderResponse['success']) throw new Exception($processOrderResponse['message']);

            DB::commit();
            return $processOrderResponse;
        } catch (Exception $e) {

            DB::rollBack();
            return $this->response()->error($e->getMessage());
        }
    }
}
