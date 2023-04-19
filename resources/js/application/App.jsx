import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";

window.React = React;
function App() {
    return  <Home />;
}

if (document.getElementById("application")) {
    const root = createRoot(document.getElementById("application"));
    root.render(<App />);
}
