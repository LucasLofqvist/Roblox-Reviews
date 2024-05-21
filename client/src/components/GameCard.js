import React from 'react';
import FetchReviewStats from './FetchReviewStates';
import { Link } from 'react-router-dom'; 
const GameCard = ({ game, isAdmin }) => {
    return (
        <div className="game-card">
            <Link to={`/games/${encodeURIComponent(game.title)}`} className="game-link">
                <div className="game-image-wrapper">
                    <img src={game.thumbnailUrl} alt={game.title} className="game-image" />
                </div>
                <h3 className="game-title">{game.title}</h3>
            </Link>
            <div className="game-stats">
                <FetchReviewStats gameId={game._id} />
            </div>
            {isAdmin && (
                <div className="admin-controls">
                    <button className="update-button">Update</button>
                    <button className="delete-button">Delete</button>
                </div>
            )}
        </div>
    );
};


export default GameCard;
