import React from "react";
import SignUp from "./SignUp";
import { createRoot } from "react-dom/client";
window.React = React

function Main({csrf,authUser}) {
  console.log(csrf,authUser)
    return (
          <SignUp csrf={csrf}/>
    );
}

export default Main;

if (document.getElementById("signup")) {
  const root = createRoot(document.getElementById("signup"));
  let csrfToken =  document.getElementById("signup").dataset.csrf_token;
  console.log(document.getElementById("signup").dataset)
  let authUser =  document.getElementById("signup").dataset.authuser;
  root.render(<Main csrf={csrfToken} authUser={authUser}/>);
}
