import React from "react";
import Download from "./Download";
import {useEffect} from 'react'
import { createRoot } from "react-dom/client";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConferenceTicket from "./TicketPdf";
function Main({csrf,authUser}) {

  useEffect(()=>{
    const ticket_purchase_order_id = localStorage.getItem('ticket_purchase_order_id');
    // make a get request to get ticket data



  },[])

    return (
      <>
      <ToastContainer/>
      <Download csrf={csrf}/>
      {/* <ConferenceTicket/> */}
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
