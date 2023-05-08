import React from "react";

import { createRoot } from "react-dom/client";
window.React = React;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Main({ csrf, authUser, page }) {
    return (
        <>
            <ToastContainer />
            {page === "signin" && <SignIn csrf={csrf} />}
            {page === "signup" && <SignUp csrf={csrf} />}
        </>
    );
}

export default Main;

if (document.getElementById("auth")) {
    const element = document.getElementById("auth");
    const root = createRoot(element);
    let csrfToken = element.dataset.csrf_token;
    let authUser = element.dataset.authuser;
    let page = element.dataset.page;
    root.render(<Main page={page} csrf={csrfToken} authUser={authUser} />);
}
