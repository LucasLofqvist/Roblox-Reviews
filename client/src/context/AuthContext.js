import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchRouter } from '../components/FetchRouter';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isTokenExpired = (token) => {
        try{
            const exp = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                return true;
            }
            return false;
        }catch(err){
            return false;
        }
    }
    const setLogoutTimer = useCallback((token) => {
        const { exp } = jwtDecode(token);
        const expTime = exp * 1000 - Date.now()
        setTimeout( () => logout(), expTime)
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userDetails = sessionStorage.getItem('userDetails');

        if (token && !isTokenExpired) {
            setIsLoggedIn(true);
            if (userDetails) {
                setUser(JSON.parse(userDetails));
            }
            setLogoutTimer(token);
        } else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userDetails');
        }
    }, [setLogoutTimer]);

    const postAuthRedirect = async () => {
        const preLoginRoute = sessionStorage.getItem('preLoginRoute');
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        const gameId = sessionStorage.getItem('gameId');
        const gameTitle = sessionStorage.getItem('gameTitle');

        if (preLoginRoute && gameId && gameTitle) {
            try {
                const reviewsData = await FetchRouter(`api/reviews/${gameId}`);
                const hasReviewed = reviewsData[0]?.reviews.some(review => review.user.username === userDetails.username);
                if (hasReviewed) {
                    alert('You have already submitted a review for this game!');
                    navigate(`/games/${gameTitle}`);
                } else {
                    navigate(`/games/${gameId}/add-review`);
                }
            } catch (error) {
                console.error('Error checking reviews:', error);
                alert('An error occurred while checking your review status. Please try again.');
                navigate(`/games/${gameId}`);
            }
        } else {
            navigate('/');
        }
    };

    const login = async (username, password) => {
        try {
            const response = await FetchRouter(`api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.token) {
                const decodeToken = jwtDecode(response.token);
                const userRole = decodeToken.role;

                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('userDetails', JSON.stringify({ username, role: userRole }));
                setIsLoggedIn(true);
                setUser({ username, role: userRole });
                setLogoutTimer(response.token);

                if( userRole === 'Moderator'){
                    navigate('/admin');
                } else {
                    postAuthRedirect();
                }
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    };
    
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userDetails')
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            login,
            logout,
            setIsLoggedIn,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
