// GameListsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GamesList from '../components/GamesList';
import FetchRouter from '../components/FetchRouter';

const GameListsPage = () => {
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

    if (loading) return <div>Loading games...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {filteredGames.length > 0 ? (
                <GamesList games={filteredGames} />
            ) : (
                <div className="no-results">No games found matching your search.</div>
            )}
        </div>
    );
};

export default GameListsPage;
