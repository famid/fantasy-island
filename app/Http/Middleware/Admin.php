<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check() && Auth::user()->role == ADMIN_ROLE){

            return $next($request);
        }elseif (Auth::check() && Auth::user()->role == USER_ROLE) {

            return redirect(route('user.sign_in'));
        }
        Auth::logout();

        return redirect()->route('user.sign_in')->with(['error' => __('You are not authorized')]);
    }
}
