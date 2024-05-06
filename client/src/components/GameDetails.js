import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
                if (!gameData || !gameData._id) {
                    throw new Error("Game not found");
                }
                
                const reviewsData = await FetchRouter(`api/reviews/${gameData._id}`);
                setReviews(reviewsData && reviewsData[0] && reviewsData[0].reviews ? reviewsData[0].reviews : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);

    return (
        <div className="game-details">
            {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> :
            game && (
                <>
                    <h2>{game.title}</h2>
                    <div className="game-details-image-wrapper">
                        <img src={game.thumbnailUrl} alt={game.title} className="game-details-image" />
                    </div>
                    <p>{game.description}</p>
                    {game.gameUrl && <button onClick={() => window.open(game.gameUrl, "_blank")} className="game-link-button">Play Now</button>}
                    <div className="reviews">
                        <h3>Reviews</h3>
                        {reviews.length ? reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h4>{review.username}</h4>
                                <p className="review-text">{review.reviewText}</p>
                                <div className="review-details">
                                    <span className={`violence-indicator ${review.violence ? 'violence-yes' : 'violence-no'}`}>Violence: {review.violence ? 'Yes' : 'No'}</span>
                                    <span className="suggested-age">Suggested Age: {review.suggestedAge}</span>
                                </div>
                                <div 
                                    className="rating-stars"
                                    style={{ '--rating': `${review.rating * 10}%` }} />
                            </div>
                        )) : <p>No reviews yet</p>}
                    </div>
                </>
            )}
        </div>
    );
};

export default GameDetails;