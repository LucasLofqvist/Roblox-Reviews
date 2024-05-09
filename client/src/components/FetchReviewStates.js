import React, { useState, useEffect } from 'react';
import {FetchRouter} from './FetchRouter';

const FetchReviewStats = ({ gameTitle }) => {
    const [reviewStats, setReviewStats] = useState({
        averageRating: 'N/A',
        totalReviews: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviewStats = async () => {
            try {
                const gameData = await FetchRouter(`api/games/${encodeURIComponent(gameTitle)}`);
                if (!gameData || !gameData._id) {
                    throw new Error("Game not found");
                }

                const reviewsData = await FetchRouter(`api/reviews/${gameData._id}`);
                                
                if (reviewsData && reviewsData.length > 0 && reviewsData[0]) {
                    const { averageRating, count } = reviewsData[0]; // Destructuring for cleaner access
                    setReviewStats({
                        averageRating: averageRating || 'N/A',
                        totalReviews: count || 0
                    });
                } 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewStats();
    }, [gameTitle]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="review-stats">
            <>
                <p>Average Rating: {reviewStats.averageRating}</p>
                <p>Total Reviews: {reviewStats.totalReviews}</p>
            </>
        </div>
    );
};

export default FetchReviewStats;
