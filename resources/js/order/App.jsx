import React from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { domain } from "../uitls";

function Main({authUser, csrfToken}) {
    return <> <Order data={{authUser, csrfToken}}/><ToastContainer /></>
}

export default Main;

if (document.getElementById("order")) {
  const element = document.getElementById("order")
  const root = createRoot(element);
  let csrfToken =  element.dataset.csrf_token;
  let authUser =  element.dataset.authuser;
  root.render(<Main csrfToken={csrfToken} authUser={authUser}/>);
}
