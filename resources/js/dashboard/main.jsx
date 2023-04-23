import React,{useState} from "react";
import {useEffect} from 'react'
import { createRoot } from "react-dom/client";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Dashboard";
function Main({csrf,authUser}) {

  const [orders, setOrders] = useState([])

  useEffect(  ()=>{
    // make a get request to get ticket data

    const request = async () => {
      try{
        const response = await fetch(`admin/orders/list`)
        if(response.ok){
          const result = await response.json();
           setOrders([...result.data.data])
        }
      } catch (e){console.log(e)}
    }
    request()


  },[])

    return (
      <>
      <ToastContainer/>
      <Dashboard csrfToken={csrf} orders={orders}/>
      {/* <ConferenceTicket/> */}
      </>
    );
}

export default Main;

if (document.getElementById("dashboard")) {
  const element = document.getElementById("dashboard")
  const root = createRoot(element);
  let csrfToken =  element.dataset.csrf_token;
  let authUser =  element.dataset.authuser;
  root.render(<Main csrf={csrfToken} authUser={authUser}/>);
}
