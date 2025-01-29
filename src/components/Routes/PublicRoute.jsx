import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const {user} = useSelector((state) => state.auth);

    // If user is logged in, redirect to the dashboard
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PublicRoute;
