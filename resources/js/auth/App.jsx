import React from "react";
import SignUp from "./SignUp";
import { createRoot } from "react-dom/client";
window.React = React

function Main() {
    return (
          <SignUp />
    );
}

export default Main;

if (document.getElementById("signup")) {
  const root = createRoot(document.getElementById("signup"));
  root.render(<Main />);
}
