import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameDetails from '../components/GameDetails';
import '../style/gameReview.css';


const GameDetailPage = ({ gameTitle }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button className='go-back-button' onClick={() => navigate(-1)} >Go Back</button>
            <GameDetails gameTitle={gameTitle} />
        </div>
    );
};

export default GameDetailPage;
