import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <div className="home-container">
                    <section className="hero-section">
                        <h1>Welcome to Notes App</h1>
                        <p>Your personal space for organizing thoughts and ideas</p>
                        
                        {isAuthenticated ? (
                            <div className="authenticated-home">
                                <p>Welcome back, {user?.username}!</p>
                                <Link to="/dashboard" className="cta-button">
                                    Go to Dashboard
                                </Link>
                            </div>
                        ) : (
                            <div className="unauthenticated-home">
                                <p>Get started by creating an account or logging in</p>
                                <div className="cta-buttons">
                                    <Link to="/signup" className="cta-button primary">
                                        Sign Up
                                    </Link>
                                    <Link to="/login" className="cta-button secondary">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className="features-section">
                        <h2>Features</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>🔒 Secure</h3>
                                <p>Your notes are protected with industry-standard authentication</p>
                            </div>
                            <div className="feature-card">
                                <h3>📝 Easy to Use</h3>
                                <p>Simple and intuitive interface for creating and managing notes</p>
                            </div>
                            <div className="feature-card">
                                <h3>🚀 Fast</h3>
                                <p>Quick access to all your notes with real-time updates</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Home;

