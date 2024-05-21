import React from 'react';
// import notFoundImage from '../img/ghost.jpg';
import '../style/notFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <img src="placehold.co/200x200" alt="404 Not Found" className="not-found-image" />
            <h1>Oops! Page Not Found</h1>
            <p>The game you're looking for doesn't exist.</p>
        </div>
    );
};

export default NotFoundPage;
