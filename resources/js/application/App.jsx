
import * as React from 'react'
import { createRoot } from 'react-dom/client';

function App() {
    return <div>wellcome to react seciton</div>;
}


if (document.getElementById("application")) {
    const root = createRoot(document.getElementById("application"));
    root.render(<App />);
}
