import React from 'react';
// import { useNavigate } from 'react-router-dom';
import GameDetails from '../components/GameDetails';
import '../style/gameReview.css';


const GameDetailPage = ({ gameTitle }) => {
    // const navigate = useNavigate();

    return (
        <div>
            <GameDetails gameTitle={gameTitle} />
        </div>
    );
};

export default GameDetailPage;
