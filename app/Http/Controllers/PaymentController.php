<?php

namespace App\Http\Controllers;

use App\Http\Services\PaymentService;
use App\Http\Services\UserService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * @return Application|Factory|View
     */
    public function makeManualPayment(Request $request): View|Factory|Application {
        $orderPaymentSuccessResponse = $this->paymentService->manualPaymentOperation($request);

        if($orderPaymentSuccessResponse['success']) {
            return view('purchase-success');
        }

        return view('purchase-failed');
    }


    /**
     * @param Request $request
     * @return Application|Factory|View|RedirectResponse
     */
    public function success(Request $request): View|Factory|RedirectResponse|Application {
        $orderPaymentSuccessResponse = $this->paymentService->paymentSuccess($request);

        $updateUserAuthResponse = $this->paymentService->updateAuthUser($request->value_a);
        if(!$updateUserAuthResponse['success']) return redirect()->route('user.sign_in');

        if($orderPaymentSuccessResponse['success']) {
            return view('purchase-success');
        }

        return view('purchase-failed');
    }

    /**
     * @param Request $request
     * @return Application|Factory|View|RedirectResponse
     */
    public function failure(Request $request) {
        $updateUserAuthResponse = $this->paymentService->updateAuthUser($request->value_a);
        if(!$updateUserAuthResponse['success']) return redirect()->route('user.sign_in');

        return view('purchase-failed');
    }

    /**
     * @param Request $request
     * @return Application|Factory|View|RedirectResponse
     */
    public function cancel(Request $request) {
        $updateUserAuthResponse = $this->paymentService->updateAuthUser($request->value_a);
        if(!$updateUserAuthResponse['success']) return redirect()->route('user.sign_in');

        return view('purchase-failed');
    }
}
