import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameListsPage from '../pages/GameListsPage';
import GameDetailPage from '../pages/GameDetailPage'; // The detail page you are setting up

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GameListsPage />} />
                <Route path="/games/:gameId" element={<GameDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;

