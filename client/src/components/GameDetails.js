import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {FetchRouter} from './FetchRouter';
import { ReviewsDisplay } from './ReviewDisplay';



const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
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
                setGame(gameData);
            } catch (err) {
                setError("message:" + err.message);
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
                
                    <ReviewsDisplay gameId={game._id} />
                    
                </> 
                
            )}
        </div>
    )
                
}

export default GameDetails;