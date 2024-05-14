import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; // Adjust based on your file naming
import "../src/style/index1.css";
import "../src/style/index2.css";
import "../src/style/carousell.css"
import "../src/style/news.css"
import "../src/style/about.css"

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
