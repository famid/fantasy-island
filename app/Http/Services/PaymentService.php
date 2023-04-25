<?php

namespace App\Http\Services;


use App\Http\Repositories\OrderRepository;
use App\Http\Services\Boilerplate\BaseService;
use App\Http\Services\Order\OrderService;
use DGvai\SSLCommerz\SSLCommerz;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
     *
     * This payment method is used for ssl ecommerze payment gateway.
     *
     * @param $orderId
     * @return array
     */
    public function makePayment($orderId): array {
        try {
            $order = $this->orderRepository->firstWhere(['id' => $orderId]);
            if($this->isOrderAlreadyPaid($order)) return $this->response()->error("This order payment is already done");

            $transactionId = generateTransactionIdForSslEcomerze();
            $order->transaction_id = $transactionId;

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
                ->trxid($order->transaction_id ?? DEFAULT_TRANSACTION_NUMBER)
                ->product(DEFAULT_PRODUCT_NAME)
                ->customer(
                    $order->user()->name ?? DEFAULT_CUSTOMER_NAME,
                        $order->user()->email ?? DEFAULT_CUSTOMER_EMAIL
                )->setExtras($order->id);
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

            $order = $this->orderRepository->firstWhere([
                'id' => $request->value_a,
                'payment_status' => PENDING_STATUS
            ]);
            if(!$order) return $this->response()->error("No order is founded.");

            DB::beginTransaction();
            $saveSslPaymentInfo = $this->orderRepository->updateWhere(['id' => $order->id],
                [
                    'payment_system' => $request->card_type,
                    'client_phone' => $request->client_phone,
                    'transaction_id' => $request->tran_id,
                ]
            );
            if(!$saveSslPaymentInfo) throw new Exception("Order payment info does not save!");

            $processOrderResponse = $this->updateOrderAndGenerateTicketAndGame($order->id);
            if(!$processOrderResponse['success']) throw new Exception($processOrderResponse['message']);

            DB::commit();

            Log::info(
                "User Phone: " . ($order->user() ? $order->user->phone : 'null') .
                " Order Info: " . ($order ? $order : 'null') .
                " Payment Details: " . json_encode($request->all() ?? 'null')
            );
            return $processOrderResponse;
        } catch (Exception $e) {

            Log::error(
                "Error occurred while logging. Error: {$e->getMessage()}
                Payment Details: " . json_encode($request->all() ?? 'null')
            );
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
    public function manualPaymentOperation($request)
    {
        try {
            $order = $this->orderRepository->firstWhere([
                'id' => $request->order_id,
                'user_id' => $request->user_id,
                'payment_status' => PENDING_STATUS
            ]);
            if (!$order) return $this->response()->error("No order is founded.");

            DB::beginTransaction();
            $saveManualPaymentInfo = $this->orderRepository->updateWhere(['id' => $order->id],
                [
                    'payment_system' => $request->payment_system,
                    'client_phone' => $request->client_phone,
                    'transaction_id' => $request->transaction_id,
                    'merchant_account_phone' => $request->merchant_account_phone,
                ]
            );
            if (!$saveManualPaymentInfo) throw new Exception("Order payment info does not save!");

            $processOrderResponse = $this->updateOrderAndGenerateTicketAndGame($request->order_id);
            if (!$processOrderResponse['success']) throw new Exception($processOrderResponse['message']);

            DB::commit();
            return $processOrderResponse;
        } catch (Exception $e) {

            DB::rollBack();
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $orderId
     * @return array
     */
    public function updateAuthUser($orderId): array {
        try {
            $order = $this->orderRepository->firstWhere(['id' => $orderId,]);
            if(!$order) return $this->response()->error("No order is founded.");

            Auth::login($order->user);
            return $this->response()->success("User auth is updated is successfully");
        } catch (Exception $e) {

            return $this->response()->error($e->getMessage());
        }
    }
}
