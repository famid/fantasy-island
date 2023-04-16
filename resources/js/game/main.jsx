import React from "react";
import { GameContextProvider } from "./store/GameContext";
import Game from "./Game";
import { createRoot } from "react-dom/client";
window.React = React

function Main() {
    return (
        <GameContextProvider>
          <Game />
        </GameContextProvider>
    );
}

export default Main;

if (document.getElementById("game")) {
  const root = createRoot(document.getElementById("game"));
  root.render(<Main />);
}
