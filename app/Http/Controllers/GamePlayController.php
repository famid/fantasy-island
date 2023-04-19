<?php

namespace App\Http\Controllers;

use App\Http\Services\GamePlayService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GamePlayController extends Controller
{
    /**
     * @var GamePlayService
     */
    private GamePlayService $gamePlayService;

    /**
     * @param GamePlayService $gamePlayService
     */
    public function __construct(GamePlayService $gamePlayService) {
        $this->gamePlayService = $gamePlayService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse {
        return response()->json($this->gamePlayService->gameStoreOperation($request));
    }

    /**
     * @param $userId
     * @return JsonResponse
     */
    public function userGameInfo($userId): JsonResponse {
        return response()->json($this->gamePlayService->userGameInfo($userId));
    }
}
