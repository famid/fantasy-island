import BoardCell from "./BoardCell";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/GameContext";
import { useWindowSize } from "@react-hook/window-size";
import BoardAction from "./BoardAction";
import { BsPauseBtn, BsPlayCircle } from "react-icons/bs";
import GameControls from "../controls/GameControls";
import { ClockContext } from "../../store/clockContext";

/**
 * Renders the puzzle board containing all the puzzle pieces
 * @returns {JSX.Element|null}
 * @constructor
 */
const GameBoard = ({ data }) => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const { board, game, start, togglePause, size } = useContext(GameContext);

    const { isFinished, setGameStarted } = useContext(ClockContext);

    /**
     * @type {[number, number]} dimensions of the browser window
     */
    const [windowWidth, windowHeight] = useWindowSize();

    /**
     * The cellSize, in pixels, is calculated based on the browser window size and the number of columns and row
     * that the puzzle has.
     */
    const [cellSize, setCellSize] = useState(/** @type {?number}*/ null);

    // calculates the optimal cellSize for the puzzle to be as large as possible while still fitting
    // inside the browser window
    useEffect(() => {
        // upon first render, the puzzle size is not yet defined
        if (!size) return;

        // check if wa are at the tailwind xs screen size breakpoint
        const isXsScreen = windowWidth < 639;

        // check if wa are at the tailwind xs screen size breakpoint
        const isSmScreen = windowWidth < 768;

        // figure out the maximum size that is available in the browser window after deducting
        // the space needed for the control menu
        const maxBoardX =
            windowWidth - (isXsScreen ? 50 : isSmScreen ? 100 : 220);
        const maxBoardY = windowHeight - (isSmScreen ? 160 : 60);

        // calculate the optimal cellSize for the individual puzzle pieces
        const maxCellX = Math.floor(maxBoardX / (size?.x || 1));
        const maxCellY = Math.floor(maxBoardY / (size?.y || 1));
        if (!isSmScreen) {
            setCellSize(Math.min(maxCellX - 100, maxCellY - 100));
        } else {
            setCellSize(Math.min(maxCellX, maxCellY));
        }
    }, [size, windowWidth, windowHeight]);

    if (!size || !board) return null;

    const startGame = () => {
        if (data?.authUser?.remaining_game > 0) {
            setGameStarted(true);
            start();
        }
    };

    return (
        <div className="flex items-center game-board flex-col  p-0 rounded">
            <div
                className="relative bg-[#ddd6] overflow-hidden"
                style={{
                    width: size.x * cellSize,
                    height: size.y * cellSize,
                }}
            >

                {!!board &&
                    !game.pauseTime &&
                    board.map((cell) => (
                        // render the individual puzzle pieces
                        <BoardCell
                            key={cell.id}
                            {...cell}
                            cellSize={cellSize}
                        />
                    ))}
                {!game.startTime && (
                    // render the overlay with the "Start" button when game is not yet started
                    <BoardAction onClick={startGame}>
                        {data?.authUser?.remaining_game > 0
                            ? "Click Here to Play"
                            : "Don't have chance? Please buy tickets"}
                             {data?.authUser?.remaining_game > 0 && <BsPlayCircle className="text-5xl" />}

                    </BoardAction>
                )}
                {isFinished && (
                    // render the overlay with the "Start" button when game is not yet started
                    <BoardAction>
                        You couldn't solve the puzzle in time!!
                        {/* <BsPlayCircle className="text-5xl" /> */}
                    </BoardAction>
                )}
                {!!game.pauseTime && (
                    // render the "Resume" button is the game is paused
                    <BoardAction onClick={togglePause}>
                        Resume Game Pause
                        <BsPauseBtn className="text-5xl" />
                    </BoardAction>
                )}
            </div>
        </div>
    );
};

export default GameBoard;
