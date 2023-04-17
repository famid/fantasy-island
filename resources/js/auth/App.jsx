import React from "react";
import SignUp from "./SignUp";
import { createRoot } from "react-dom/client";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Main({csrf,authUser}) {

    return (
      <>
      <ToastContainer/>
      <SignUp csrf={csrf}/>
      </>

    );
}

export default Main;

if (document.getElementById("signup")) {
  const element = document.getElementById("signup")
  const root = createRoot(element);
  let csrfToken =  element.dataset.csrf_token;
  let authUser =  element.dataset.authuser;
  root.render(<Main csrf={csrfToken} authUser={authUser}/>);
}
