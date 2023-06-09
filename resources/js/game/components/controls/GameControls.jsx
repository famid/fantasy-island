import GameInfo from "./GameInfo";
import {TbClick} from "react-icons/tb";
import {useContext} from "react";
import {GameContext} from "../../store/GameContext";
import {FaFlagCheckered} from "react-icons/fa";
import GameClock from "./GameClock";
import * as React from 'react'
import { ClockContext } from "../../store/clockContext";
import notify from './../../../order/components/notify';
import PrizePool from "../ui/prizePool";
import {useState} from 'react'
/**
 * Renders the game controls, either on the right or on the bottom of the puzzle board
 * this includes the game information (moves/clock) and the action buttons
 * @returns {JSX.Element}
 * @constructor
 */
const GameControls = ({data}) => {
    /**
     * @type {import('../../store/GameContext').GameContextType}
     */

    // const {game, start, togglePause, pickNewImage,puzzleImage} = useContext(GameContext);

    const { won, moves,finishingTime, timeDifference} = useContext(ClockContext);
    const [submitted, setSubmitted] = useState(false)


    /**
     * @type {NavigateFunction} navigate instance to go to the "change size" screen
     */
    // const navigate = useNavigate();> {

    const resultSubmitHandler = async () => {
        setSubmitted(true)
        const date1 = new Date(timeDifference[0]);
        const date2 = new Date(timeDifference[1]);
        const diffInMs = date2 - date1;
        function formatTime(ms) {
            const min = Math.floor(ms / 60000); // calculate minutes
            const sec = Math.floor((ms % 60000) / 1000); // calculate seconds
            const mil = ms % 1000; // calculate remaining milliseconds

            // pad single-digit numbers with a leading zero
            const minStr = min < 10 ? `0${min}` : `${min}`;
            const secStr = sec < 10 ? `0${sec}` : `${sec}`;
            const milStr = mil < 10 ? `00${mil}` : mil < 100 ? `0${mil}` : `${mil}`;

            return `${minStr}:${secStr}:${milStr}`;
          }

        try {
            const response = await fetch("/gameplays/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": data.csrfToken,
                },
                body: JSON.stringify({ user_id:data.authUser.id, is_finished:true,playtime:`${formatTime(diffInMs)}`}),
            });


            if (response.ok) {
                notify('Your result submitted successfully')
                setTimeout(()=>{{
                    location.reload();
                }},1000)
            }
        } catch (error) {
            setSubmitted(false)
            console.log(error)
        }
    }



    return (
        <div className="flex flex-col justify-center  items-center gap-2">
            <div className="flex flex-row md:flex-col gap-4 justify-between">
                {/* <GameInfo label="Moves" icon={<TbClick />}>{moves}</GameInfo> */}

                {
                    !won &&    <GameClock data={data}/>
                }


                {won && (
                    <>
                     <GameInfo icon={<FaFlagCheckered />}>
                            <div>
                                <h3> Congratulations You have finished the puzzle {finishingTime} !</h3>

                            </div>
                       </GameInfo>
                       {
                         <button disabled={submitted} className="bg-[#576CBC] hover:bg-[#0B2447] text-white font-bold py-2 px-4  focus:outline-none rounded-xl" onClick={resultSubmitHandler}>Submit Result</button>

                       }
                    </>

                )}

            </div>

        </div>
    );
}

export default React.memo(GameControls);