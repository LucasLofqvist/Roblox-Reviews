import React, { useState, useEffect } from 'react';
import FetchRouter from '../components/FetchRouter';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(0);

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

    const latestgame = games.slice(0, 3);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         console.log(currentIndex)
    //         setCurrentIndex(prevIndex => (prevIndex + 1) % latestgame.length);
    //     }, 5000);

    //     return () => clearInterval(intervalId);
    // }, [latestgame.length, currentIndex]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // style={{ transform: `translateX(${100 * (index - currentIndex)}%)`

    return (
        <div>
            <section className="container">
                <div className="slider-wrapper">
                    <div className="slider">
                        {latestgame.map((game, index) => (
                            <div key={index} className='slide'>
                            <Link to={`/games/${encodeURIComponent(game.title)}`}> <h2> {game.title}</h2> </Link>
                            <h4> {game.description}</h4>
                            <img key={index} id={`slide-${index}`} src={game.thumbnailUrl} alt={game.title}/>
                            </div>
                        ))}
                    </div>
                    <div className="slider-nav">
                        {latestgame.map((game, index) => (
                            <a key={index} href={`#slide-${index}`} onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(`slide-${index}`).scrollIntoView({ behavior: 'smooth'});
                                }}
                            ></a>
                        ))}
                    </div>
                </div>
            </section>

            <section className='news-feed'>
                <h3>News</h3>
                <div className='news'> 
                        <h3>Patch 14.01.03</h3>
                        <article className='feed'> New patch comming 2024-06-01</article>
                </div>
                <div className='news'> 
                        <h3>New games</h3>
                        <article className='feed'> New games: Lucky blox, Dress To Impress</article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
