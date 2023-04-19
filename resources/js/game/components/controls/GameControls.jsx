import GameInfo from "./GameInfo";
import {TbClick} from "react-icons/tb";
import {useContext} from "react";
import {GameContext} from "../../store/GameContext";
import {FaFlagCheckered} from "react-icons/fa";
import GameClock from "./GameClock";
import * as React from 'react'
import { ClockContext } from "../../store/clockContext";
import notify from './../../../order/components/notify';
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

    const { won, moves,finishingTime} = useContext(ClockContext);
    console.log(data)


    /**
     * @type {NavigateFunction} navigate instance to go to the "change size" screen
     */
    // const navigate = useNavigate();> {

    const resultSubmitHandler = async () => {
        try {
            const response = await fetch("/gameplays/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": data.csrfToken,
                },
                body: JSON.stringify({ user_id:data.authUser.id, is_finished:true,playtime:'00:20:10'}),
            });

            console.log(response);

            if (response.ok) {
                notify('Your result submitted successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="flex flex-col justify-center  items-center gap-2">
            <div className="flex flex-row md:flex-col gap-4 justify-between">
                {/* <GameInfo label="Moves" icon={<TbClick />}>{moves}</GameInfo> */}

                {
                    !won &&    <GameClock />
                }


                {won && (
                    <>
                     <GameInfo icon={<FaFlagCheckered />}>
                            <div>
                                <h3> Congratulations You have finished the puzzle in {finishingTime} !</h3>

                            </div>
                       </GameInfo>
                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none " onClick={resultSubmitHandler}>Submit Result</button>
                    </>

                )}

            </div>
            <div className="flex flex-row md:flex-col gap-2">
            <div className="max-w-[200px] ">
                    {/* <img className="w-[200px] object-cover  height-[200px] mt-4" src={puzzleImage} alt="" /> */}
                </div>
            </div>
        </div>
    );
}

export default React.memo(GameControls);