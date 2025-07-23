import express from 'express';
import rateLimit from 'express-rate-limit';
import User from '../models/user.model.js';
import { authenticateToken } from '../middleware/auth.js';
import { 
    validateSignup, 
    validateLogin, 
    handleValidationErrors 
} from '../middleware/validation.js';

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

//Signup endpoint
router.post('/signup', authLimiter, validateSignup, handleValidationErrors, async (req, res) => {

    try {
        
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
            ]
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.username === username.toLowerCase() 
                    ? 'Username already exists' 
                    : 'Email already exists'
            });
        }
        
        // Create new user
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password
        });
        
        await user.save();
        
        // Generate token
        const token = user.generateAuthToken();
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            }
        });
        return res.status(201).json(payload);
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during signup'
        });
    }
});



// Login endpoint
router.post('/login', authLimiter, validateLogin, handleValidationErrors, async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by credentials
        const user = await User.findByCredentials(username, password);
        
        // Generate token
        const token = user.generateAuthToken();
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    lastLogin: user.lastLogin
                },
                token
            }
        });
        return res.status(200).json(payload);
        
    } catch (error) {
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during login'
        });
    }
});






// Get user profile endpoint
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Profile retrieved successfully',
            data: {
                user: {
                    id: req.user._id,
                    username: req.user.username,
                    email: req.user.email,
                    createdAt: req.user.createdAt,
                    lastLogin: req.user.lastLogin
                }
            }
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Logout endpoint (optional - for token blacklisting if implemented)
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // In a stateless JWT system, logout is handled client-side
        // This endpoint can be used for logging or token blacklisting
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Verify token endpoint
router.get('/verify', authenticateToken, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Token is valid',
            data: {
                user: {
                    id: req.user._id,
                    username: req.user.username,
                    email: req.user.email
                }
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

export default router;

