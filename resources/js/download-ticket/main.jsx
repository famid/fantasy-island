import React,{useState} from "react";
import Download from "./Download";
import {useEffect} from 'react'
import { createRoot } from "react-dom/client";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConferenceTicket from "./TicketPdf";
function Main({csrf,authUser}) {

  const [tickets, setTickets] = useState([])

  useEffect(  ()=>{
    const ticket_purchase_order_id = localStorage.getItem('ticket_purchase_order_id');
    // make a get request to get ticket data

    const request = async () => {
      try{
        const response = await fetch(`tickets/${ticket_purchase_order_id}/info`)
        if(response.ok){

          const result = await response.json();
          console.log(result)
          setTickets([...result.data])
        }
      } catch (e){console.log(e)}
    }
    request()


  },[])

    return (
      <>
      <ToastContainer/>
      <Download csrf={csrf} tickets={tickets}/>
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
