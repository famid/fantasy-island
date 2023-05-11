<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class PurchaseSuccessController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct() {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() {
        return view('purchase-success');
    }

    /**
     * @return Factory|View|Application
     */
    public function failed(): Factory|View|Application {
        return view('purchase-failed');
    }
}
