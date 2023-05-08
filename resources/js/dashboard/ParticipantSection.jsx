import React, { useState, useEffect } from "react";
import LeaderboardTable from "../participants/table/LeaderboardTable";


function ParticipantsSection({ csrf, authUser }) {
    const [participantsData, setParticipantsData] = useState([]);

    useEffect(() => {
        // make a get request to get ticket data

        const request = async () => {
            try {
                const response = await fetch(`user/game-results/leaderboard`);
                if (response.ok) {
                    const result = await response.json();
                    setParticipantsData([...result.data]);
                }
            } catch (e) {
                console.log(e);
            }
        };
        request();
    }, []);

    return (
        <>

             <main className="participants-dashboard z-10 max-w-5xl mx-auto px-4 game-screen h-screen overflow-auto text-black">
                <h1 className="text-3xl leading-14 mb-5 text-white">
                    {" "}
                    Event Participants
                </h1>

                <LeaderboardTable participantsData={participantsData} />
            </main>
        </>
    );
}

export default ParticipantsSection;
