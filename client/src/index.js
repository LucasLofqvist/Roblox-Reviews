import React from 'react';
import ReactDOM from "react-dom";

// Define a functional component
function SimpleComponent() {
return (
    <div>
        <h1>Hello, React!</h1>
        <p>This is a simple component.</p>
    </div>
);
}

// Render the component
ReactDOM.render(<SimpleComponent />, document.getElementById('root'));