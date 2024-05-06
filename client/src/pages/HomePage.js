import React, { useState, useEffect } from 'react';
import FetchRouter from '../components/FetchRouter';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await FetchRouter('api/games');
                setGames(data)
                setLoading(false)
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchGames();
    }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const latestgame = games.slice(0,5);

    return(
        <div>
            <section class="container">
                <div class="slider-wrapper">
                    <div class="slider">
                        {latestgame.map((game, index) => (
                            <img key={index} id={`slide-${index}`} src={game.thumbnailUrl} alt={game.title}>
                        </img>
                        ))}
                    </div>
                    <div class="slider-nav">
                        {latestgame.map((game, index) => (
                            <a key={index} href={`#slide-${index}`} onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(`slide-${index}`).scrollIntoView({ behavior: 'smooth'});
                            }}></a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;