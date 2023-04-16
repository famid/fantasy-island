<?php

namespace App\Http\Services;


use App\Http\Repositories\GamePlayRepository;
use App\Http\Services\Boilerplate\BaseService;
use App\Http\Services\Order\OrderService;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class GamePlayService extends BaseService {

     /**
     * @var GamePlayRepository
     */
    private GamePlayRepository $gamePlayRepository;

    /**
     * @var OrderService
     */
    private OrderService $orderService;

    /**
     * GamePlayService constructor.
     * @param GamePlayRepository $gamePlayRepository
     */
    public function __construct(GamePlayRepository $gamePlayRepository, OrderService $orderService) {
        $this->gamePlayRepository = $gamePlayRepository;
        $this->orderService = $orderService;
    }

    /**
     * @param $request
     * @return array
     */
    public function gameStoreOperation($request): array {
        try{
            DB::beginTransaction();
            $storeResponse = $this->createGamePlay($request);
            if(!$storeResponse['success']) throw new Exception($storeResponse['message']);

            $updateRemainingGame = $this->orderService->decrementRemainingGame($request->order_id);
            if(!$updateRemainingGame['success']) throw new Exception($storeResponse['message']);

            DB::commit();
            return $this->response($updateRemainingGame['data'])->success("Game statistics is saved successfully");
        } catch (Exception $e) {

            DB::rollBack();
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param $request
     * @return array
     */
    public function createGamePlay($request): array {
        try {
            $createGamePlayResponse = $this->gamePlayRepository->create(
                $this->preparedCreateGamePlayData($request)
            );

            return !$createGamePlayResponse ?
                $this->response()->error() :
                $this->response()->success('GamePlay is created successfully');
        } catch(QueryException $e) {

            return $this->response()->error();
        }
    }

    /**
     * @param object $request
     * @return array
     */
    private function preparedCreateGamePlayData(object $request): array {
        return [
            'user_id' => $request->user_id,
            'order_id' => $request->order_id,
            'is_finished' => $request->is_finished,
            'playtime' => $request->playtime,
        ];
    }
}
