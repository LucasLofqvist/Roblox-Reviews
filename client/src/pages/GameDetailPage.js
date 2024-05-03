import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
//import Search from '../components/Search';
import GameDetails from '../components/GameDetails';
import Footer from '../components/Footer';

const GameDetailPage = ({ gameTitle }) => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <button onClick={() => navigate(-1)} style={{ margin: "1rem" }}>Go Back</button>
            <GameDetails gameTitle={gameTitle} />
            <Footer />
        </div>
    );
};

export default GameDetailPage;
