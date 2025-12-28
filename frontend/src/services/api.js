// API service for backend communication

import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.detail || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

/**
 * Predict concrete cracks using selected models
 * @param {string} imageData - Base64 encoded image
 * @param {string[]} models - Array of model keys to use
 * @returns {Promise<Object>} Prediction response
 */
export const predictImage = async (imageData, models = null) => {
    const response = await api.post(API_ENDPOINTS.PREDICT, {
        image: imageData,
        models: models,
    });
    return response.data;
};

/**
 * Upload image file
 * @param {File} file - Image file
 * @returns {Promise<Object>} Upload response
 */
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Get training history for all models
 * @returns {Promise<Object>} History response
 */
export const getModelHistory = async () => {
    const response = await api.get(API_ENDPOINTS.MODEL_HISTORY);
    return response.data;
};

/**
 * Get model metadata and information
 * @returns {Promise<Object>} Model info response
 */
export const getModelInfo = async () => {
    const response = await api.get(API_ENDPOINTS.MODEL_INFO);
    return response.data;
};

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
    const response = await api.get('/health');
    return response.data;
};

export default api;
