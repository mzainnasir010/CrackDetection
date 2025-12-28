// Custom hook for handling predictions

import { useState } from 'react';
import { predictImage } from '../services/api';
import { toBase64 } from '../utils/helpers';

/**
 * Custom hook for managing prediction state and logic
 * @returns {Object} Prediction state and functions
 */
export const usePrediction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    /**
     * Run prediction on image with selected models
     * @param {File|string} image - File object or base64 string
     * @param {string[]} selectedModels - Array of model keys
     */
    const predict = async (image, selectedModels = null) => {
        setLoading(true);
        setError(null);
        setPredictions([]);

        try {
            let base64Image;

            // Convert File to base64 if needed
            if (image instanceof File) {
                base64Image = await toBase64(image);
            } else {
                base64Image = image;
            }

            // Call API
            const response = await predictImage(base64Image, selectedModels);

            // Update state
            setPredictions(response.predictions);
            setImagePreview(response.image_preview);
            setLoading(false);

            return response;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    /**
     * Reset prediction state
     */
    const reset = () => {
        setPredictions([]);
        setImagePreview(null);
        setError(null);
        setLoading(false);
    };

    return {
        loading,
        error,
        predictions,
        imagePreview,
        predict,
        reset,
    };
};
