import React,{ useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import GamesList from '../components/GamesList'; // Assuming GamesList is a component that handles displaying games
import Footer from '../components/Footer';
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

    const handleSearch = async (searchTerm) => {
        setLoading(true);
        setError(null);
        try {
            const data = await FetchRouter(`api/games/${encodeURIComponent(searchTerm)}`);
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                setGames([data]);  // Wrap the single game object in an array
            } else {
                setGames(data);  // Assuming the API normally returns an array
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    if (loading) return <div>Loading games...</div>;
    if (error) return <div>Error: {error}</div>;

        return (
        <div>
            <Header />
            <Search onSearch={handleSearch} />
            <GamesList games={games} /> 
            <Footer />
        </div>
    );
};

export default GameListsPage;
