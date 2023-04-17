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

    /**
     * PaymentService constructor.
     * @param OrderRepository $orderRepository
     */
    public function __construct(
        OrderRepository $orderRepository,
        OrderService $orderService,
        TicketService $ticketService
    ) {
        $this->orderRepository = $orderRepository;
        $this->orderService = $orderService;
        $this->ticketService = $ticketService;
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

    public function paymentSuccess($request): array {
//        dd($request->all());
        try {
            $validate = SSLCommerz::validate_payment($request);
            if(!$validate) return $this->response()->error("Orders payment is failed");

            DB::beginTransaction();
            $updateOrderStatus = $this->orderService->updatePaymentStatus($request->value_a);

            if(!$updateOrderStatus['success']) throw new Exception("Order payment status is not updated");

            $createTicketResponse = $this->ticketService->insertTickets($updateOrderStatus['data']);
            if(!$createTicketResponse['success']) throw new Exception($createTicketResponse['message']);

            DB::commit();
            return $this->response()->success("Tickets are saved successfully");
        } catch (Exception $e) {

            DB::rollBack();
            return $this->response()->error($e->getMessage());
        }


    }
}
