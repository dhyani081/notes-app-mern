import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import SignupForm from '../components/auth/SignupForm';
import Navbar from '../components/layout/Navbar';

const Signup = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <div className="auth-container">
                    <SignupForm />
                </div>
            </main>
        </div>
    );
};

export default Signup;

