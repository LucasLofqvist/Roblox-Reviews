import React from 'react';

const GameCard = ({ game }) => {
    return (
        <div className="game-container">
            <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover" />
            <h3 className="game-title">{game.title}</h3>
            <p className="game-description">{game.description}</p>
            <div className="game-info">Rating: {game.rating}, violence: {game.violence}, suggestedAge: {game.suggestedAge}</div>
        </div>
    );
};

export default GameCard;
