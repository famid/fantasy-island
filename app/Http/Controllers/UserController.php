<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    private UserService $userService;

    /**
     * @param UserService $userService
     */
    public function __construct(UserService $userService) {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function registration(Request $request): JsonResponse {
        return response()->json($this->userService->registration($request));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function resendOtp(Request $request): JsonResponse {
        return response()->json($this->userService->registration($request));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function verifyOtp(Request $request): JsonResponse {
        return response()->json($this->userService->verifyOtp($request));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse {
        return response()->json($this->userService->login($request));
    }
}
