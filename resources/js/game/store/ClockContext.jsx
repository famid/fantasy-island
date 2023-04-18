import { createContext, useCallback, useEffect, useState } from "react";
import Game from "../models/Game";
import { pickRandomImage } from "../data/imageList";

/**
 * @typedef {Object} GameContextType
 * @property {{x: number, y: number}} size - number of columns and rows of the puzzle
 * @property {function} setSize - setter for the puzzle size
 * @property {?Game} game - instance of the Game being played
 * @property {Object[]} board - state of the puzzle board being rendered
 * @property {function} start - function to start the game
 * @property {function(number, number): null} play - function to play a piece at given column and row
 * @property {function} togglePause - pause or resume the game
 * @property {?string} puzzleImage - dynamic path to the current puzzle image
 * @property {function} pickNewImage - selects a new random image for the puzzle
 */

export const ClockContext = createContext(
    /** @type {GameContextType} */ {
        isFinished: false,
        setIsFinished: () => {},
        gameStarted: false,
        setGameStarted: () => {},
        won:false,
        setWon:() => {},
        moves:0,
        setMoves:()=>{}
    }
);

/**
 * Game Context Provider with its state
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */

export const ClockContextProvider = ({ children }) => {
    const [isFinished, setIsFinished] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [won, setWon] = useState(false);
    const [moves, setMoves] = useState(0);
    const [gameFinishingTime, setGameFinishingTime] = useState('')

    return (
        <ClockContext.Provider
            value={
                /** @type {GameContextType} */ {
                    isFinished,
                    setIsFinished,
                    gameStarted,
                    setGameStarted,
                    won,
                    setWon,
                    moves,
                    setMoves,
                    gameFinishingTime,
                    setGameFinishingTime
                }
            }
        >
            {children}
        </ClockContext.Provider>
    );
};
