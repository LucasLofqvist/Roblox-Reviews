import React, { useState, useEffect, useRef } from 'react';
import { FetchRouter } from '../components/FetchRouter';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [newGames, setNewGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchTop3Reviews = async () => {
            try {
                const games = await FetchRouter('api/games');
                const reviews = await FetchRouter('api/reviews');
                const gamesWithAverageRating = games.map(game => {
                    const gameReviews = reviews.filter(review => review.gameId === game._id);
                    const totalRating = gameReviews.reduce((sum, review) => sum + review.rating, 0);
                    const averageRating = gameReviews.length > 0 ? totalRating / gameReviews.length : 0;
                    return {
                        ...game,
                        averageRating: averageRating,
                        reviews: gameReviews
                    };
                });
                const sortedGames = gamesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
                setGames(sortedGames.slice(0, 3)); // Slice the top 3 games and set them
                setNewGames(games.slice(0, 2));
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTop3Reviews();
    }, []);

    const totalSlides = games.length;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalSlides + 1));
            setIsTransitioning(true);
        }, 10000); // Change the interval to 3000ms (3 seconds)

        return () => clearInterval(intervalId);
    }, [totalSlides]);

    useEffect(() => {
        if (currentIndex === totalSlides) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500); // Duration of the transition
        }
    }, [currentIndex, totalSlides]);

    const minText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0,maxLength) + '...';
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <section className="container">
                <div className="slider-wrapper">
                    <div
                        ref={sliderRef}
                        className="slider"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
                        }}
                    >
                        {games.map((game, index) => (
                            <div key={index} className="slide">
                                <h2>{game.title}</h2>
                                <h4>{minText(game.description, 105)}</h4>
                                <Link to={`/games/${encodeURIComponent(game.title)}`}><img src={game.thumbnailUrl} alt={game.title} />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="slider-nav">
                        {games.map((_, index) => (
                            <a
                                key={index}
                                href={`#slide-${index}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentIndex(index);
                                    setIsTransitioning(true);
                                }}
                                className={currentIndex === index ? 'active' : ''}
                            >
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="news-feed">
                <h3>News</h3>
                <div className="news">
                    <h3>Patch 14.01.03</h3>
                    <article className="feed">New patch coming 2024-06-01:
                    Bug Fixes: Resolved several issues causing game crashes.
                    New Map: Explore the mystic forests of Eldoria.</article>
                </div>
                <div className="news">
                    <h3>New games</h3>
                    <div className='new-games'>
                        {newGames.map((game, index) => (
                            <article className="feed">• {game.title} - {minText(game.description, 80)}</article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
