import React,{ useState, useEffect } from 'react';
import GamesList from '../components/GamesList'; // Assuming GamesList is a component that handles displaying games
import FetchRouter from '../components/FetchRouter';

const GameListsPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await FetchRouter('api/games');
                setGames(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);
    
    if (loading) return <div>Loading games...</div>;
    if (error) return <div>Error: {error}</div>;

        return (
        <div>
            <GamesList games={games} />
        </div>
    );
};

export default GameListsPage;
