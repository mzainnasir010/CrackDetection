// Helper utility functions

import { VALIDATION } from './constants';

/**
 * Format confidence value (0-1) to percentage string
 * @param {number} value - Confidence value between 0 and 1
 * @returns {string} Formatted percentage (e.g., "98.5%")
 */
export const formatConfidence = (value) => {
    return `${(value * 100).toFixed(1)}%`;
};

/**
 * Format inference time in seconds
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
    if (seconds < 1) {
        return `${(seconds * 1000).toFixed(0)}ms`;
    }
    return `${seconds.toFixed(2)}s`;
};

/**
 * Validate image file on client side
 * @param {File} file - File object to validate
 * @returns {{isValid: boolean, error: string|null}}
 */
export const validateImageFile = (file) => {
    if (!file) {
        return { isValid: false, error: 'No file selected' };
    }

    // Check file type
    if (!VALIDATION.ALLOWED_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: `Invalid file type. Allowed types: ${VALIDATION.ALLOWED_EXTENSIONS.join(', ')}`,
        };
    }

    // Check file size
    if (file.size > VALIDATION.MAX_FILE_SIZE) {
        const maxSizeMB = VALIDATION.MAX_FILE_SIZE / (1024 * 1024);
        return {
            isValid: false,
            error: `File size exceeds ${maxSizeMB}MB limit`,
        };
    }

    return { isValid: true, error: null };
};

/**
 * Convert File to base64 string
 * @param {File} file - File object
 * @returns {Promise<string>} Base64 encoded string
 */
export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Get model display name from key
 * @param {string} modelKey - Model key
 * @returns {string} Display name
 */
export const getModelDisplayName = (modelKey) => {
    const names = {
        vgg16_baseline: 'VGG16 Baseline',
        vgg16_augmented: 'VGG16 Augmented',
        resnet50_baseline: 'ResNet50 Baseline',
        resnet50_augmented: 'ResNet50 Augmented',
    };
    return names[modelKey] || modelKey;
};

/**
 * Get color for prediction result
 * @param {string} prediction - Prediction result ('crack' or 'no_crack')
 * @returns {string} Tailwind color class
 */
export const getPredictionColor = (prediction) => {
    return prediction === 'crack' ? 'text-warning' : 'text-success';
};

/**
 * Get background color for prediction result
 * @param {string} prediction - Prediction result ('crack' or 'no_crack')
 * @returns {string} Tailwind color class
 */
export const getPredictionBgColor = (prediction) => {
    return prediction === 'crack' ? 'bg-red-50' : 'bg-green-50';
};
