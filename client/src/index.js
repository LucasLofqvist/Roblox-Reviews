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
