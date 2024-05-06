import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Adjust based on your file naming
import "./gameLayout.css"; // Ensure this path is correct
import "./index1.css";
import "./index2.css";

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
