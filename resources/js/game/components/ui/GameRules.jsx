import React from "react";
import GameClock from "../controls/GameClock";

function GameRules() {

    return (
        <article className="max-w-[280px] flex items-center">

            <div>
            <h2 className="text-left text-2xl  text-indigo-300 leading-8 font-semibold">You bought <span className="text-red-400">19 </span> tickets and already attended  <span className="text-red-400">8 </span> games, you have  <span className="text-red-400">11 </span> chances left! </h2>
                <h1 className="text-2xl font-bold tracking-wide leading-[60px] text-indigo-400 ">
                    Rules Of The Game!
                </h1>
                <ul className="mb-8 space-y-4 text-left text-indigo-300 dark:text-gray-400">
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
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
                        <span className="text-indigo-300 text-lg leading-7">
                            You play the game one time for each ticket purchase
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
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
                        <span className="text-indigo-300 text-lg leading-7">
                            Once you started the game, you can't pause.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
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
                        <span className="text-indigo-300 text-lg leading-7">
                            {" "}
                            Fastest ten puzzle solver win the prize.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
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
                        <span className="text-indigo-300 text-lg leading-7">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </span>
                    </li>
                    <li className="flex items-center space-x-3">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
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
                        <span className="text-indigo-300 text-lg leading-7">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                        </span>
                    </li>
                </ul>
            </div>
        </article>
    );
}

export default GameRules;
