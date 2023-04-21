import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../store/GameContext";
import { IoMdTime } from "react-icons/io";
import GameInfo from "./GameInfo";
import Countdown, { zeroPad } from "react-countdown";
import * as React from 'react'
import { ClockContext } from "../../store/clockContext";
import notify from "../../../order/components/notify";

/**
 * Renders a clock showing the time elapsed
 * @returns {JSX.Element}
 * @constructor
 */
const GameClock = ({data}) => {
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

    const resultSubmitHandler = async () => {
        try {

            const response = await fetch("/gameplays/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": data.csrfToken,
                },
                body: JSON.stringify({ user_id:data.authUser.id, is_finished:false,playtime:'00:00:00'}),
            });

            if (response.ok) {
                notify('Your result submitted successfully')
                setTimeout(()=>{{
                    location.reload();
                }},1000)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const countDownCompleteHandler = (time) => {
        setIsFinished(true)
        setGameStarted(false)
        resultSubmitHandler()
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
                        date={Date.now() + 3 * 60 * 1000}
                        renderer={renderer}
                        onTick={finishingTimeHandler}
                />
                ):'00:00'
            }
        </GameInfo>
    );
};

export default React.memo(GameClock);
