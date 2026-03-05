import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // If they aren't authenticated, kick them back to the landing page
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
