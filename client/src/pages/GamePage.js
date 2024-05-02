import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import GamesList from '../components/GameList';

const GamePage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const mockGames = [
            { id: 1, title: 'Game 1', description: 'Description 1', imageUrl: 'url', rating: '5', violence: 'Low', suggestedAge: '12+' },
            { id: 2, title: 'Game 2', description: 'Description 2', imageUrl: 'url', rating: '4', violence: 'Medium', suggestedAge: '16+' }
        ];
        setGames(mockGames);
    }, []);

    const handleSearch = (searchTerm) => {
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
        {/* This is a comment inside JSX */}
        <Header />
        <Search onSearch={handleSearch} />
        <GamesList games={games} />
</div>

    );
};

export default GamePage;
