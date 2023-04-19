import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/GameContext";
import { IoMdTime } from "react-icons/io";
import GameInfo from "./GameInfo";
import Countdown, { zeroPad } from "react-countdown";
import * as React from 'react'
import { ClockContext } from "../../store/clockContext";

/**
 * Renders a clock showing the time elapsed
 * @returns {JSX.Element}
 * @constructor
 */
const GameClock = () => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */
    const { gameStarted, setIsFinished, won,setGameStarted,timeDifference,setTimeDifference } = useContext(ClockContext);

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
                    {zeroPad(minutes)}:{zeroPad(seconds)}
                </span>
            );
        }
    };

    const countDownStartHandler = () => {
        console.log('started')
        setTimeDifference((oldState)=>{
            return [...oldState, new Date()]
        })
    }

    const countDownCompleteHandler = (time) => {
        console.log(time)

        setIsFinished(true)
        setGameStarted(false)

    }


    const finishingTimeHandler = (time) =>{

    }

    useEffect(()=>{
        console.log(timeDifference)
    },[timeDifference])

    return (
        <GameInfo label="Time" icon={<IoMdTime />}>
            {
                gameStarted ? (
                    <Countdown
                        intervalDelay={200}
                        precision={3}
                        onStart={countDownStartHandler}
                        onComplete={countDownCompleteHandler}
                        date={Date.now() + 5 * 60 * 1000}
                        renderer={renderer}
                        onTick={finishingTimeHandler}
                />
                ):'00:00'
            }
        </GameInfo>
    );
};

export default React.memo(GameClock);
