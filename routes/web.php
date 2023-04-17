<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GamePlayController;
use App\Http\Controllers\NagadPaymentController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SubcategoryController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Http\Request;
use Spatie\ArrayToXml\ArrayToXml;

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
Route::get('/order', function () {
    return view('order');
});
Route::get('/purchase-success', [App\Http\Controllers\PurchaseSuccessController::class, 'index'])->name('purchase-success');


//====================Start Fantasy Island ========================//
use App\Http\Controllers\UserController;

// Auth Route
Route::post('register', [UserController::class, 'registration'])->name('user.register');
Route::post('resend-otp', [UserController::class, 'resendOtp'])->name('user.resend_otp');
Route::post('verify-otp', [UserController::class, 'verifyOtp'])->name('user.verify_otp');
Route::post('login', [UserController::class, 'login'])->name('user.login');

// Order Route
Route::post('orders/create', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order_id}/make-payment', [PaymentController::class, 'makePayment'])->name('orders.make_payment');



// Game Play Route
Route::post('gameplays/create', [GamePlayController::class, 'store'])->name('gameplays.store');

Route::get('test', function (\App\Http\Controllers\PaymentController $payment) {
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

Route::middleware('auth')->prefix('/category')->as('category.')->group(function () {
    Route::get('/list', [CategoryController::class, 'getList'])->name('list');
});

Route::middleware('auth')->prefix('/subcategory')->as('subcategory.')->group(function () {
    Route::get('/list', [SubcategoryController::class, 'getList'])->name('list');
});

Route::middleware('auth')->prefix('/warehouse')->as('warehouse.')->group(function () {
    Route::get('/index', [WarehouseController::class, 'index'])->name('index');
    Route::get('/list', [WarehouseController::class, 'getList'])->name('list');
    Route::delete('/delete/{id}', [WarehouseController::class, 'destroy'])->name('destroy');
    Route::get('/create', [WarehouseController::class, 'create'])->name('create');
    Route::post('/store', [WarehouseController::class, 'store'])->name('store');
});

//Route::post('sslcommerz/success','PaymentController@success')->name('payment.success');
//Route::post('sslcommerz/success','PaymentController@success')->name('payment.success');
Route::post('sslcommerz/success', [PaymentController::class, 'success'])->name('payment.success');
Route::post('sslcommerz/failure', [PaymentController::class, 'failure'])->name('payment.failure');
Route::post('sslcommerz/cancel', [PaymentController::class, 'cancel'])->name('sslc.cancel');
Route::post('sslcommerz/ipn', [PaymentController::class, 'ipn'])->name('payment.ipn');

Route::get('/nagad/pay', [NagadPaymentController::class, 'pay'])->name('nagad.pay');
Route::get('nagad/callback', [NagadPaymentController::class, 'callback'])->name('nagad.callback');
