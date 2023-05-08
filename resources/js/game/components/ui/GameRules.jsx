import React, { useEffect, useState } from "react";
import GameClock from "../controls/GameClock";

function GameRules({ data }) {
    const [totalGames, setTotalGames] = useState(0);
    const [remainingGames, setRemainingGames] = useState(0);

    const fetchUserGameInfo = async () => {
        try {
            const response = await fetch(`/gameplays/${data.authUser.id}/info`);
            const result = await response.json();

            if (result.data) {
                setTotalGames(data.authUser.total_playable_game);
                setRemainingGames(data.authUser.remaining_game);
            } else {
            }
        } catch (e) {}
    };

    useEffect(() => {
        fetchUserGameInfo();
    }, []);
    return (
        <article className="max-w-[280px] rules flex items-center justify-center">
            <div>
                <h2 className="text-left text-2xl  text-gray-100 leading-8 font-semibold">
                    You bought{" "}
                    <span className="text-green-500">{totalGames} </span>{" "}
                    tickets and already attended{" "}
                    <span className="text-green-500">
                        {totalGames - remainingGames}{" "}
                    </span>{" "}
                    games, you have{" "}
                    <span className="text-green-500">{remainingGames} </span>{" "}
                    chances left!{" "}
                </h2>
                <h1 className="text-2xl font-bold tracking-wide leading-[60px] text-gray-100 ">
                    Rules Of The Game!
                </h1>
                <ul className="mb-8 space-y-4 text-left text-gray-100 dark:text-gray-400">
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-100 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-gray-100 text-lg leading-7">
                            You can play the puzzle one time for each ticket
                            purchase
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-100 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-gray-100 text-lg leading-7">
                            Once you started the game, you can't pause.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-100 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-gray-100 text-lg leading-7">
                            Try to Finish the game fastest time possible.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-100 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-gray-100 text-lg leading-7">
                            After solving the puzzle submit result.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-100 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="text-gray-100 text-lg leading-7">
                            {" "}
                            Fastest ten puzzle solver win the Gifts.
                        </span>
                    </li>
                </ul>
            </div>
        </article>
    );
}

export default GameRules;
