import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet';

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 6000;

// Calling Database
import "./config/db.js";

// Calling Models
import "./models/notes.model.js";
import "./models/user.model.js";

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to your Notes API!',
    docs: '/api/health'
  });
});

// 404 handler
// app.use('*', (req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found'
//     });
// });
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});