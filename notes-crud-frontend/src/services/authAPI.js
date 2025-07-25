    import axios from "axios";

    // const API_BASE_URL = "http://localhost:5000/api";
    const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

    // Create axios instance with default config
    const apiClient = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Request interceptor to add auth token
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor to handle auth errors
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Token is invalid or expired
                localStorage.removeItem("authToken");
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }
    );

    export const authAPI = {
        // User registration
        signup: async (userData) => {
            const response = await apiClient.post("/auth/signup", userData);
            return response.data;
        },

        // User login
        login: async (credentials) => {
            const response = await apiClient.post("/auth/login", credentials);
            return response.data;
        },

        // User logout
        logout: async () => {
            const response = await apiClient.post("/auth/logout");
            return response.data;
        },

        // Get user profile
        getProfile: async () => {
            const response = await apiClient.get("/auth/profile");
            return response.data;
        },

        // Verify token
        verifyToken: async () => {
            const response = await apiClient.get("/auth/verify");
            return response.data;
        }
    };

    export default apiClient;

