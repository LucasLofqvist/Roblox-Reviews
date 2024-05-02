import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import GamesList from '../components/GameList';


import { fetchRouter } from '../components/FetchRouter';  

const GamePage = () => {
    const [games, setGames] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const mockGames = [
            { id: 1, title: 'Game 1', description: 'Description 1', imageUrl: 'url', rating: '5', violence: 'Low', suggestedAge: '12+' },
            { id: 2, title: 'Game 2', description: 'Description 2', imageUrl: 'url', rating: '4', violence: 'Medium', suggestedAge: '16+' }
        ];
        setGames(mockGames);
        
        // fetchRouter('/api/games')
        //     .then(data => {
        //         setGames(data);  
        //     })
        //     .catch(error => {
        //         console.error('Error fetching games', error);
        //     });
    }, []);

    // const handleSearch = (searchTerm) => {
    //     fetchRouter(`games/search?query=${searchTerm}`)
    //         .then(data => {
    //             setGames(data);
    //         })
    //         .catch(error => {
    //             console.error('Error searching games', error);
    //         });
    // };
    const handleSearch = (searchTerm) => {
        // Simulate a filter operation on the mock data
        const mockGames = [
            { id: 1, title: 'Game 1', description: 'Description 1', imageUrl: 'url', rating: '5', violence: 'Low', suggestedAge: '12+' },
            { id: 2, title: 'Game 2', description: 'Description 2', imageUrl: 'url', rating: '4', violence: 'Medium', suggestedAge: '16+' }
        ];
        const filteredGames = mockGames.filter(game => 
            game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setGames(filteredGames);
    };
    
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <Search onSearch={handleSearch} />
            <GamesList games={games} />
        </div>
    );
};

export default GamePage;
