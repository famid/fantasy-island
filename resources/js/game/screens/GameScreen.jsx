import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";
import GameRules from "../components/ui/GameRules";
import PrizePool from "../components/ui/prizePool";
import { GameContextProvider } from "../store/GameContext";
import { ClockContextProvider } from "../store/clockContext";


/**
 * Game Screen component, renders the puzzle in GameBoard and the game information and buttons in GameControls
 * @returns {JSX.Element}
 * @constructor
 */
const GameScreen = ({ data }) => {
    return (
        <div className=" gap-12 wrapper">
            <GameRules data={data} />
            <ClockContextProvider>
                <div className="flex flex-col gap-3 md:mt-0 mt-20">
                <GameControls data={data} />
                    <GameContextProvider>
                        <GameBoard data={data} />
                    </GameContextProvider>

                </div>
                <div className="pools">
                <PrizePool/>
                </div>



            </ClockContextProvider>
        </div>
    );
};

export default GameScreen;
