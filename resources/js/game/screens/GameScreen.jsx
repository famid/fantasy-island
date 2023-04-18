import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";
import GameRules from "../components/ui/GameRules";
import { GameContextProvider } from "../store/GameContext";
import { ClockContextProvider } from "../store/clockContext";

/**
 * Game Screen component, renders the puzzle in GameBoard and the game information and buttons in GameControls
 * @returns {JSX.Element}
 * @constructor
 */
const GameScreen = () => {
    return (

        <div className="flex gap-12 lg:flex-row flex-col-reverse ">
            <GameRules />
            <ClockContextProvider>
                <GameContextProvider>
                    <GameBoard />
                </GameContextProvider>
                <GameControls />
            </ClockContextProvider>
        </div>

    );
};

export default GameScreen;
