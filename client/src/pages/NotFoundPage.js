import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../img/notFound.jpg';
import '../style/notFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <img src={notFoundImage} alt="404 Not Found" className="not-found-image" />
            <h1>Oops! Page Not Found</h1>
            <p>The game you're looking for doesn't exist.</p>
            <Link to="/">👉Go Back Home</Link>
        </div>
    );
};

export default NotFoundPage;
