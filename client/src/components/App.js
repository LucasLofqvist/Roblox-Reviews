import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameListsPage from '../pages/GameListsPage';
import GameDetailPage from '../pages/GameDetailPage';
import { AuthProvider } from '../context/AuthContext';
import Signup from '../pages/SignUp';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import About from '../pages/aboutUsPage'
 
const App = () => {
    return (
        <div>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={ <HomePage />} />
                            <Route path="/gameList" element= { <GameListsPage /> } />
                            <Route path="/games/:gameId" element= { <GameDetailPage />} />
                            <Route path="/signup" element= { <Signup />} />
                            <Route path="/login" element= { <Login />} />
                            <Route path="/about" element= { <About />} />
                        </Routes>
                    </Layout>
                </AuthProvider>  
            </Router>
        </div>
    );
}

export default App;
