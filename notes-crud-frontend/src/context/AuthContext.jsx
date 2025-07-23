import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI';
import {toast} from 'react-toastify';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Token management
    const getToken = () => localStorage.getItem('authToken');
    const setToken = (token) => localStorage.setItem('authToken', token);
    const removeToken = () => localStorage.removeItem('authToken');

    // Check if token is valid (not expired)
    const isTokenValid = (token) => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    };

    // Initialize authentication state
    useEffect(() => {
        const initializeAuth = async () => {
            const token = getToken();
            
            if (token && isTokenValid(token)) {
                try {
                    const response = await authAPI.verifyToken();
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } catch (error) {
                    toast.error('Session expired: Login Again')
                    console.error('Token verification failed:', error);
                    removeToken();
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { user, token } = response.data;
            
            setToken(token);
            setUser(user);
            setIsAuthenticated(true);
            toast.success('Login Successfully')
            
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
            throw error;
        }
    };

    // Signup function
    const signup = async (userData) => {
        try {
            const response = await authAPI.signup(userData);
            const { user, token } = response.data;
            
            setToken(token);
            setUser(user);
            setIsAuthenticated(true);
            toast.success('Account created Successfully');
            return response;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await authAPI.logout();
            toast.info('Logged Out');
        } catch (error) {

            console.error('Logout error:', error);
            toast.error('Error Logging Out')
        } finally {
            removeToken();
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // Update user profile
    const updateUser = (userData) => {
        setUser(prev => ({ ...prev, ...userData }));
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updateUser,
        getToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};