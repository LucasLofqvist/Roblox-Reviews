import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); // Move useNavigate inside the function
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (userDetails) => {
        setIsLoggedIn(true);
        setIsAdmin(userDetails.isAdmin);
        userDetails.isAdmin ? navigate('/admin/dashboard') : navigate('/user/dashboard');
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/'); // This will now work correctly
    };

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn,
            isAdmin,
            login,
            logout,
            setIsLoggedIn, 
            setIsAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};
