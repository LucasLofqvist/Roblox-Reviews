// GameListsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import GamesList from '../components/GamesList';
import {FetchRouter} from '../components/FetchRouter';
import '../style/gameLayout.css';

const GameListsPage = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams(); // New Hook to get URL search params

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await FetchRouter('api/games');
                setGames(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const searchTerm = searchParams.get('search'); // Get search term from query params
    const filteredGames = searchTerm ? games.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : games;

    useEffect(() => {
        if (!loading && filteredGames.length === 0) {
            navigate('/404');
        }
    }, [loading, filteredGames, navigate]);

    if (loading) return <div>Loading games...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='game-list-container'>
            {filteredGames.length > 0 ? (
                <GamesList games={filteredGames} />
            ) : null }
        </div>
    );
};

export default GameListsPage;
