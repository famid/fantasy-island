import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/GameContext";
import { IoMdTime } from "react-icons/io";
import GameInfo from "./GameInfo";
import Countdown from "react-countdown";

/**
 * Renders a clock showing the time elapsed
 * @returns {JSX.Element}
 * @constructor
 */
const GameClock = () => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const { game } = useContext(GameContext);

    /**
     * clock is the time elapsed in minutes:seconds
     */
    const [clock, setClock] = useState(/** @type {string} */ "00:00");



    const Completionist = () => <span>Time finished!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, milliseconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    };

    const countDownStartHandler = () => {
        console.log('started')
    }

    const countDownCompleteHandler = () => {
        console.log('finished')
    }
    return (
        <GameInfo label="Time" icon={<IoMdTime />}>
            <Countdown
                intervalDelay={100}
                precision={3}
                onStart={countDownStartHandler}
                onComplete={countDownCompleteHandler}
                date={Date.now() + 5 *60* 1000}
                renderer={renderer}
            />
        </GameInfo>
    );
};

export default GameClock;
