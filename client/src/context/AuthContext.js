import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchRouter } from '../components/FetchRouter';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initialize isLoggedIn based on the presence of a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDetails = localStorage.getItem('userDetails');
        if (token) {
            setIsLoggedIn(true);
            if (userDetails) {
                setUser(JSON.parse(userDetails));
            }
        }
    }, []);

    // AuthContext.js
const login = async (username, password) => {
    try {
        const response = await FetchRouter(`api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.token) {
            localStorage.setItem('token', response.token);  // Store the token
            setIsLoggedIn(true);  // Update login state
            setUser({ username });  // Set user details
            navigate('/gameList');  // Navigate to homepage or dashboard as needed
        } else {
            throw new Error(response.message || 'Login failed');
        }
    } catch (err) {
        console.error('Login error:', err);
        throw err;  // Rethrow to handle in component
    }
};


    const logout = () => {
        localStorage.removeItem('token');
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
