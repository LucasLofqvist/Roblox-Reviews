import React, { useState, useEffect } from 'react';
import { FetchRouter } from './FetchRouter';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/AuthContext';

export const ReviewsDisplay = ({ gameId, gameTitle }) => {
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth(AuthContext);
    const navigate = useNavigate()

    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = await FetchRouter(`api/reviews/${gameId}`);
                if (!reviewsData || !reviewsData[0] || !Array.isArray(reviewsData[0].reviews)) {
                    setReviews([]);
                } else {
                    const sortedReviews = reviewsData[0].reviews.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setReviews(sortedReviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [gameId]);

    const handleAddReviewClick = () => {
        const token = localStorage.getItem('token');
        if (!user ||!token) {
            sessionStorage.setItem('preLoginRoute', `/games/${gameId}/add-review`);
            alert('Please log in to post a review!');
            navigate(`/login`, { state: { intendedAction: 'add-review', gameTitle } });
        } else {
            const hasReviewed = reviews.some(review => review.user.username === user.username);
            if (hasReviewed) {
                alert('You have already submitted a review for this game!');
            } else {
                navigate(`/games/${gameId}/add-review`, {state: {gameTitle}});
            }
        }
    }

    const currentYear = new Date().getFullYear();
    
    return (
        <div className="reviews">
            <h3>Reviews 
                <button className="add-review-button" onClick={handleAddReviewClick}>
                    +
                </button>
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
                        style={{ '--rating': `${(review.rating / 10) * 100}%` }} />
                </div>
            )) : <p>No reviews yet</p>}
        </div>
    );
};
