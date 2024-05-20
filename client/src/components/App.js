import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameListsPage from '../pages/GameListsPage';
import GameDetailPage from '../pages/GameDetailPage';
import { AuthProvider } from '../context/AuthContext';
import Signup from '../pages/SignUp';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import AddReviewForm from '../pages/AddReviewForm';
import About from '../pages/aboutUsPage'
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../pages/AdminPage';
import ProtectedRoute from './ProtectedRoute';

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
                            <Route path="/games/:gameId/add-review" element={<AddReviewForm />} />
                            <Route path="/signup" element= { <Signup />} />
                            <Route path="/login" element= { <Login />} />
                            <Route path="/about" element= { <About />} />
                            <Route path="/404" element={<NotFoundPage />} />
                            <ProtectedRoute path="/admin" component={AdminDashboard} allowedRoles={['Moderator']} />
                        </Routes>
                    </Layout>
                </AuthProvider>  
            </Router>
        </div>
    );
}

export default App;
