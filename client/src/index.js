<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Adjust based on your file naming
import "./index.css"; // Ensure this path is correct

const rootElement = document.getElementById("root");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element");
}
=======
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App1'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)
>>>>>>> freds-branch
