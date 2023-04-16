import GameBoard from "../components/board/GameBoard";
import GameControls from "../components/controls/GameControls";
import GameRules from "../components/ui/GameRules";

/**
 * Game Screen component, renders the puzzle in GameBoard and the game information and buttons in GameControls
 * @returns {JSX.Element}
 * @constructor
 */
const GameScreen = () => {
    return (
        <div className="flex gap-5 xl:flex-row flex-col-reverse ">
            <GameRules/>
            <GameBoard />
            <GameControls />
        </div>
    );
}

export default GameScreen;