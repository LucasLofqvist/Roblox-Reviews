import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                user && allowedRoles.includes(user.role) ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/" />
                )
            }
        />
    );
};

export default ProtectedRoute;