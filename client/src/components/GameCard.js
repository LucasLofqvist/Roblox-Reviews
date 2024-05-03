import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <Link to={`/games/${encodeURIComponent(game.title)}`} className="game-link">
                <div className="game-image-wrapper">
                    <img src={game.thumbnailUrl} alt={game.title} className="game-image" />
                </div>
                <h3 className="game-title">{game.title}</h3>
            </Link>
            <div className="game-stats">
                <p>Average Rating: {game.averageRating || 'N/A'}</p>
                <p>Total Reviews: {game.totalReviews || 0}</p>
            </div>
        </div>
    );
};


export default GameCard;
