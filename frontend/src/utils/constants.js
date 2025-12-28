// Constants for the application

export const MODEL_KEYS = {
    VGG16_BASELINE: 'vgg16_baseline',
    VGG16_AUGMENTED: 'vgg16_augmented',
    RESNET50_BASELINE: 'resnet50_baseline',
    RESNET50_AUGMENTED: 'resnet50_augmented',
};

export const MODEL_NAMES = {
    [MODEL_KEYS.VGG16_BASELINE]: 'VGG16 Baseline',
    [MODEL_KEYS.VGG16_AUGMENTED]: 'VGG16 Augmented',
    [MODEL_KEYS.RESNET50_BASELINE]: 'ResNet50 Baseline',
    [MODEL_KEYS.RESNET50_AUGMENTED]: 'ResNet50 Augmented',
};

export const MODEL_COLORS = {
    [MODEL_KEYS.VGG16_BASELINE]: '#3b82f6',
    [MODEL_KEYS.VGG16_AUGMENTED]: '#10b981',
    [MODEL_KEYS.RESNET50_BASELINE]: '#f59e0b',
    [MODEL_KEYS.RESNET50_AUGMENTED]: '#ef4444',
};

export const VALIDATION = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png'],
};

export const API_ENDPOINTS = {
    PREDICT: '/api/predict',
    UPLOAD: '/api/upload',
    MODEL_HISTORY: '/api/model-history',
    MODEL_INFO: '/api/model-info',
};

export const ROUTES = {
    HOME: '/',
    DETECT: '/detect',
    COMPARE: '/compare',
    ABOUT: '/about',
};
