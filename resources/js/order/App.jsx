import React from "react";
import { createRoot } from "react-dom/client";
import Order from "./Order";
window.React = React
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Main() {
    return <> <Order/><ToastContainer /></>
}

export default Main;

if (document.getElementById("order")) {
  const root = createRoot(document.getElementById("order"));
  root.render(<Main />);
}
