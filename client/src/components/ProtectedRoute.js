import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles, redirectPath = '/' }) => {
    const { user } = useAuth();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};

export default ProtectedRoute;
