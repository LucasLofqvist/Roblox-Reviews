import React from 'react';
import GameCard from './GameCard'; 

const GamesList = ({games}) => {
    
        return (
        <div className="games-list">
            {games.map(game => (
                <GameCard key={game._id} game={game} />
            ))}
        </div>
    );
    };

export default GamesList;