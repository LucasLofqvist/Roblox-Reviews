import React, { createContext, useContext, useState, useEffect } from 'react';
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

    // Initialize isLoggedIn based on the presence of a token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDetails = localStorage.getItem('userDetails');

        if (token && !isTokenExpired) {
            setIsLoggedIn(true);
            if (userDetails) {
                setUser(JSON.parse(userDetails));
            }
            setLogoutTimer(token);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userDetails');
        }
    }, []);

    const setLogoutTimer = (token) => {
        const { exp } = jwtDecode(token);
        const expTime = exp * 1000 - Date.now()
        setTimeout( () => logout(), expTime)
    }

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
                localStorage.setItem('userDetails', JSON.stringify({ username }));  // Store user details
                setIsLoggedIn(true);  // Update login state
                setUser({ username });  // Set user details
                setLogoutTimer(response.token);
                setTimeout(() => navigate(-1), 100);  // Navigate to the previous page ensure the update
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
        localStorage.removeItem('userDetails')
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
