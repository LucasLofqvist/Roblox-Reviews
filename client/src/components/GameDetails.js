import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Assume fetchRouter is imported from wherever you have defined it
import FetchRouter from './FetchRouter'; 

const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameData = await FetchRouter(`api/games/${gameId}`);
                setGame(gameData);
                const reviewsData = await FetchRouter(`api/reviews/${gameId}`);
                setReviews(reviewsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);

    const handleGameUrlClick = () => {
        if (game && game.gameUrl) {
            window.open(game.gameUrl, "_blank"); // Opens in a new tab
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="game-details">
            {game ? (
                <>
                    <h2>{game.title}</h2>
                    <img src={game.thumbnailUrl} alt={game.title} className="w-full h-48 object-cover" />
                    <p>{game.description}</p>
                    {game.gameUrl && (
                        <button onClick={handleGameUrlClick} className="game-link-button">
                            Play Now
                        </button>
                    )}
                    <div>
                        <h3>Reviews</h3>
                        {reviews.length ? (
                            reviews.map(review => (
                                <div key={review._id}>
                                    <h4>{review.username}</h4>
                                    <p>{review.reviewText}</p>
                                    <p>Rating: {review.rating}</p>
                                    <p>Violence: {review.violence ? 'Yes' : 'No'}</p>
                                    <p>Suggested Age: {review.suggestedAge}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Game not found</p>
            )}
        </div>
    );
};

export default GameDetails;



