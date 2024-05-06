import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameDetails from '../components/GameDetails';


const GameDetailPage = ({ gameTitle }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ margin: "1rem" }}>Go Back</button>
            <GameDetails gameTitle={gameTitle} />
        </div>
    );
};

export default GameDetailPage;
