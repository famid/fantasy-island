import React from "react";
import Download from "./Download";
import { createRoot } from "react-dom/client";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Main({csrf,authUser}) {

    return (
      <>
      <ToastContainer/>
      <Download csrf={csrf}/>
      </>

    );
}

export default Main;

if (document.getElementById("download-ticket")) {
  const element = document.getElementById("download-ticket")
  const root = createRoot(element);
  let csrfToken =  element.dataset.csrf_token;
  let authUser =  element.dataset.authuser;
  root.render(<Main csrf={csrfToken} authUser={authUser}/>);
}
