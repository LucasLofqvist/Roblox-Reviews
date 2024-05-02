import React from 'react';
import GameCard from './GameCard';

const GamesList = ({ games }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GamesList;
