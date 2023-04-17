<?php

namespace App\Http\Controllers;

use App\Http\Services\PaymentService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * @var PaymentService
     */
    private PaymentService $paymentService;

    /**
     * @param PaymentService $paymentService
     */
    public function __construct(PaymentService $paymentService) {
        $this->paymentService = $paymentService;
    }

    /**
     * @param $order_id
     * @return JsonResponse
     */
    public function makePayment($order_id): JsonResponse {
        return response()->json($this->paymentService->makePayment($order_id));
    }

    /**
     * @param Request $request
     * @return Application|View|Factory
     */
    public function success(Request $request): Application|View|Factory {
        $orderPaymentSuccessResponse = $this->paymentService->success($request);

        if($orderPaymentSuccessResponse['success']) {
            return view('purchase-success');
        }

        return view('purchase-failed');
    }

    public function failure(Request $request)
    {

        //  do the database works
        //  also same goes for cancel()
        //  for IPN() you can leave it untouched or can follow
        //  official documentation about IPN from SSLCommerz Panel

    }
}
