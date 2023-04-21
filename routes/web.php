<?php

use App\Http\Controllers\GamePlayController;
use App\Http\Controllers\NagadPaymentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return redirect()->route('login');
// });

Auth::routes();

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/game', [App\Http\Controllers\GameController::class, 'index'])->name('game');
Route::get('/signup', [App\Http\Controllers\SignupController::class, 'index'])->name('signup');
Route::get('/signin', function () {
    return view('signin');
});
Route::get('/order', function () {
    return view('order');
});
Route::get('/purchase-success', [App\Http\Controllers\PurchaseSuccessController::class, 'index'])->name('purchase-success');


//====================Start Fantasy Island ========================//
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

// Auth Route
Route::post('register', [UserController::class, 'registration'])->name('user.register');
Route::post('resend-otp', [UserController::class, 'resendOtp'])->name('user.resend_otp');
Route::post('verify-otp', [UserController::class, 'verifyOtp'])->name('user.verify_otp');
Route::post('login', [UserController::class, 'login'])->name('user.login');

// Order Route
Route::post('orders/create', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order_id}/make-payment', [PaymentController::class, 'makePayment'])->name('orders.make_payment');
Route::post('/orders/make-manual-payment', [PaymentController::class, 'makeManualPayment'])->name('orders.manual_payment');

// This route fetch all unpaid status order which purchase date is greater or equal than current date
// Input: user_id
Route::get('/orders/{user_id}/unpaid-order', [OrderController::class, 'unpaidOrders'])->name('orders.unpaid');
Route::get('/orders/list', [OrderController::class, 'orderList'])->name('admin.orders.list');

// Game Play Route
Route::post('gameplays/create', [GamePlayController::class, 'store'])->name('gameplays.store');
// This route fetch game plays info, return total `total_playable_game` and `remaining_game`
// Input: user_id
Route::get('gameplays/{user_id}/info', [GamePlayController::class, 'userGameInfo'])->name('gameplays.info');

// Ticket Route

// This route all tickets info by orderId
// Input: order_id
Route::get('tickets/{order_id}/info', [TicketController::class, 'orderTicketsInfo'])->name('tickets.info');
Route::post('tickets/update/make-used', [TicketController::class, 'updateTicketStatusById'])->name('tickets.update.');

Route::get('test', function (
    \App\Http\Controllers\PaymentController $payment,
    OrderController $orderController,
    GamePlayController $gamePlayController
) {
    $numbers = "01618019049";
    $response  = sendOTP($numbers, 1555, SMS_SENDER_ID);
    dd($response);
    dd($gamePlayController->userGameInfo(5));
    dd($orderController->unpaidOrders(2));
    $data = $payment->order();
    dd((json_decode($data, True)));
});

//========================End Fantasy Island==========================//


Route::middleware('auth')->prefix('/product')->as('product.')->group(function () {
    Route::get('/list', [ProductController::class, 'getList'])->name('list');
    Route::get('/create', [ProductController::class, 'create'])->name('create');
    Route::post('/store', [ProductController::class, 'store'])->name('store');
    Route::get('/delete/{id}', [ProductController::class, 'delete'])->name('destroy');
});

Route::post('sslcommerz/success', [PaymentController::class, 'success'])->name('payment.success');
Route::post('sslcommerz/failure', [PaymentController::class, 'failure'])->name('payment.failure');
Route::post('sslcommerz/cancel', [PaymentController::class, 'cancel'])->name('sslc.cancel');
Route::post('sslcommerz/ipn', [PaymentController::class, 'ipn'])->name('payment.ipn');

Route::get('/nagad/pay', [NagadPaymentController::class, 'pay'])->name('nagad.pay');
Route::get('nagad/callback', [NagadPaymentController::class, 'callback'])->name('nagad.callback');
