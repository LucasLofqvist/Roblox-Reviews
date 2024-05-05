import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameListsPage from '../pages/GameListsPage';
import GameDetailPage from '../pages/GameDetailPage';

const App = () => {
    return (
        <div>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element= { <GameListsPage /> } />
                        <Route path="/games/:gameId" element= { <GameDetailPage />} />
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
