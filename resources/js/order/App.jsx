import React from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
window.React = React

function Main() {
    return <Order/>
}

export default Main;

if (document.getElementById("order")) {
  const root = createRoot(document.getElementById("order"));
  root.render(<Main />);
}
