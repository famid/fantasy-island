import React from "react";
import { GameContextProvider } from "./store/GameContext";
import Game from "./Game";
import { createRoot } from "react-dom/client";
window.React = React

function Main({authUser, csrfToken}) {
    return (
        <GameContextProvider>
          <Game data={{authUser,csrfToken}}/>
        </GameContextProvider>
    );
}

export default Main;

if (document.getElementById("game")) {
  const element= document.getElementById("game")
  const root = createRoot(element);
  let csrfToken =  element.dataset.csrf_token;
  let authUser =  element.dataset.authuser;
  root.render(<Main csrfToken={csrfToken} authUser={JSON.parse(authUser)}/>);
}
