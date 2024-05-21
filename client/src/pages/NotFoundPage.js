import React from 'react';
import notFoundImage from '../img/pixel404123.png';
import '../style/notFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <img src={notFoundImage} alt="404 Not Found" className="not-found-image" />
            <h1>Oops! Game Not Found</h1>
            <p>The game you're looking for doesn't exist.</p>
        </div>
    );
};

export default NotFoundPage;
