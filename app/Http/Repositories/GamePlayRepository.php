<?php

namespace App\Http\Repositories;

use App\Models\GamePlay;

class GamePlayRepository extends BaseRepository {

    /**
     * GamePlayRepository constructor.
     * @param GamePlay $gamePlay
     */
    public function __construct(GamePlay $gamePlay) {
        parent::__construct($gamePlay);
    }
}
