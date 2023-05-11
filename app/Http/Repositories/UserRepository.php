<?php

namespace App\Http\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository extends BaseRepository {

    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user) {
        parent::__construct($user);
    }

    /**
     * @return mixed
     */
    public function getLeaderboardData(): mixed {
        return $this->model::select(
            'users.id AS user_id',
            'users.name',
            'users.phone',
            'game_plays.playtime',
            DB::raw('ROW_NUMBER() OVER(ORDER BY game_plays.playtime ASC) AS ranking')
        )
            ->join('game_plays', 'users.id', '=', 'game_plays.user_id')
            ->where('game_plays.is_finished', '=', GAME_SUCCESS_STATUS)
            ->orderBy('ranking')
            ->limit(30)
            ->get();

    }
}
