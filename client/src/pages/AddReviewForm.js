import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authFetchRouter } from '../components/FetchRouter';
import { useNavigate } from 'react-router-dom';
import '../style/addReview.css';

export const AddReviewForm = () => {
    const { gameId } = useParams();
    console.log(gameId);
    const { user } = useAuth();  // Get user details from context
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [violence, setViolence] = useState(false);
    const [suggestedAge, setSuggestedAge] = useState('All');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to post a review.');
            navigate("/login");
            return;
        }
    
        const reviewData = {
            gameId,
            username: user.username,
            rating,
            reviewText,
            violence,
            suggestedAge,
        };

        
    
        try {
            const response = await authFetchRouter(`api/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
        
            if (response.success) {
                alert('Review added successfully!');
                navigate("/");
            } else {
                alert(`Failed to add review: ${response.message}`);
            }
        } catch (error) {
            console.error('Failed to add review:', error);
            alert('Failed to add review: ' + error.message);
        }
    }        

    return (
        <div className="add-review-container">
            <form onSubmit={handleSubmit} className="review-form">
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Enter your review"
                required
            />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                min="1"
                max="10"
                required
            />
            <label>
                Violence:
                <input
                    type="checkbox"
                    checked={violence}
                    onChange={(e) => setViolence(e.target.checked)}
                />
            </label>
            <label>
                Suggested Age:
                <select
                    value={suggestedAge}
                    onChange={(e) => setSuggestedAge(e.target.value)}
                    required>
                    <option value="All">All</option>
                    <option value="9+">9+</option>
                    <option value="13+">13+</option>
                    <option value="17+">17+</option>
                </select>
            </label>
            <button type="submit">Submit Review</button>
        </form>
        </div>
    );
};