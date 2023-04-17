import React from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "react-router-dom";

function Main({authUser, csrfToken}) {

    if(!authUser){
      window.location.href='http://127.0.0.1:8000/signin'
      return
    }
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
