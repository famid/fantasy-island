import React, { useState } from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
window.React = React;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Participants from "./Participants";
function Main({ csrf, authUser }) {
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
            <ToastContainer />
            <Participants participantsData={participantsData} />
        </>
    );
}

export default Main;

if (document.getElementById("participants")) {
    const element = document.getElementById("participants");
    const root = createRoot(element);
    let csrfToken = element.dataset.csrf_token;
    let authUser = element.dataset.authuser;
    root.render(<Main csrf={csrfToken} authUser={authUser} />);
}
