import React from "react";
import Navbar from "../application/components/ui/navbar";
import LeaderboardTable from "./table/LeaderboardTable";

function Participants({ participantsData }) {
    return (
        <div
            className=" w-full h-screen"
            style={{ background: "url('/assets/images/bg.webp')" }}
        >
            <Navbar />

            <main className=" z-10 pt-40 max-w-5xl mx-auto px-4 game-screen h-screen overflow-auto">
                <h1 className="text-3xl leading-14 mb-5 text-white">
                    {" "}
                    Event Participants
                </h1>

                <LeaderboardTable participantsData={participantsData} />
            </main>
        </div>
    );
}

export default Participants;
