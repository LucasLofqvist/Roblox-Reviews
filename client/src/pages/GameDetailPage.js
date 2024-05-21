import React from 'react';
import GameDetails from '../components/GameDetails';
import '../style/gameReview.css';

const GameDetailPage = ({ gameTitle }) => {
    return (
        <div>
            <GameDetails gameTitle={gameTitle} />
        </div>
    );
};

export default GameDetailPage;
