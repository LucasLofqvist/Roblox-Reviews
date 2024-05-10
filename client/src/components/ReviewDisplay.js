import React, { useState, useEffect } from 'react';
import { FetchRouter } from './FetchRouter';
import { Link } from 'react-router-dom';

export const ReviewsDisplay = ({ gameId }) => {
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await FetchRouter(`api/reviews/${gameId}`);
                if (!reviewsData || !reviewsData[0] || !Array.isArray(reviewsData[0].reviews)) {
                    setReviews([]);
                } else {
                    const sortedReviews = reviewsData[0].reviews.sort((a, b) => 
                        new Date(b.created_at) - new Date(a.created_at)
                    );
                    setReviews(sortedReviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [gameId]);


    const currentYear = new Date().getFullYear();
    
    

    return (
        <div className="reviews">
            <h3>Reviews
            <Link to={`/games/${gameId}/add-review`}>
                <button className="add-review-button">Add New Review</button>
            </Link>
            </h3>
            {reviews.length ? reviews.map((review, index) => (
                <div key={index} className="review-card">
                    <h4>{review.user.username}   {currentYear - review.user.birthYear}</h4>
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
    );
};
