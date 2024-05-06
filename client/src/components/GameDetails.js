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
                const _id = gameData._id
                setGame(gameData);
                const reviewsData = await FetchRouter(`api/reviews/${_id}`);
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
                    <div className="game-details-image-wrapper">
                        <img src={game.thumbnailUrl} alt={game.title} className="game-details-image" />
                    </div>
                    <p>{game.description}</p>
                    {game.gameUrl && (
                        <button onClick={handleGameUrlClick} className="game-link-button">
                            Play Now
                        </button>
                    )}
                    <div className='reviews'>
                        <h3>Reviews</h3>
                        {reviews.length ? (
                            reviews.map(review => (
                                <div className="review-card">
                                <h4>{review.username}</h4>
                                <p className="review-text">{review.reviewText}</p>
                                <div className="review-details">
                                    <span className={`violence-indicator ${review.violence ? 'violence-yes' : 'violence-no'}`}>
                                        Violence: {review.violence ? 'Yes' : 'No'}
                                    </span>
                                    <span className="suggested-age">
                                        Suggested Age: {review.suggestedAge}
                                    </span>
                                </div>
                                <div className="rating-stars" style={{ '--rating': review.rating / 2 }}>
                                    {/* Stars inserted via CSS */}
                                </div>
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



