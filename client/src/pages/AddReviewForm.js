import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authFetchRouter } from '../components/FetchRouter';
import { useNavigate } from 'react-router-dom';
import '../style/addReview.css';

const AddReviewForm = () => {
    const { gameId } = useParams();
    const { user } = useAuth();  
    const username = user.username

    const navigate = useNavigate();
    const gameTitle= sessionStorage.getItem('gameTitle') || '';
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const [violence, setViolence] = useState(false);
    const [suggestedAge, setSuggestedAge] = useState('All');

    useEffect(() => {
        if (!gameTitle) {
            console.warn('gameTitle is not in sessionStorage');
        } else {
            console.log('gameTitle: ' + gameTitle);
            sessionStorage.setItem('gameTitle', gameTitle);  // Ensure gameTitle is set in sessionStorage
        }
    }, [gameTitle]);

    useEffect(() => {
        return () => {
            sessionStorage.removeItem('gameTitle');  // Clean up sessionStorage when component unmounts
        };
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

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
                navigate(`/games/${gameTitle}`);
            } else {
                alert(`Failed to add review: ${response.message}`);
                navigate(`/games/${gameTitle}`);
            }
        } catch (error) {
            console.error('Failed to add review:', error);
            alert('Failed to add review: ' + error.message);
            navigate(`/games/${gameTitle}`);
        }
    }        

    return (
        <div className="add-review-container">
            <div className="review-body">
                <h1>{gameTitle}</h1>
                <h2>Dear {username}, your review is important✍️</h2>
                <form onSubmit={handleSubmit} className="review-form">
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Enter your review with max 200 characters!"
                    maxLength={200}
                    rows={10}
                    required
                />
                <div className="input-container">
                <label>
                    Rating: 
                        <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        min="1"
                        max="10"
                        required
                    />
                </label>
                </div>
                <div className="checkbox-container">
                    <label>
                        Violence: 
                        <input
                            type="checkbox"
                            checked={violence}
                            onChange={(e) => setViolence(e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                            Suggested&nbsp;Age:
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
                </div>
                <button type="submit">Submit Review</button>
            </form>
            </div>
        </div>
    );
};

export default AddReviewForm