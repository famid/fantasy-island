import { createContext, useCallback, useEffect, useState } from "react";



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
