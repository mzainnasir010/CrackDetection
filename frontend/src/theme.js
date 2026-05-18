/**
 * theme.js - Single source of truth for all design tokens.
 * Model names match exactly what the Node.js Server / HF Space expect.
 */

// Palette
export const COLORS = {
  bg:        'var(--bg)',
  bgRaised:  'var(--bg-raised)',
  bgCard:    'var(--bg-card)',
  border:    'var(--border)',
  borderHover: 'var(--border-hover)',

  textPrimary:   'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  textMuted:     'var(--text-muted)',

  accent:      'var(--accent)',
  accentDim:   'var(--accent-dim)',
  accentHover: 'var(--accent-hover)',

  danger:     'var(--danger)',
  dangerDim:  'var(--danger-dim)',
  success:    'var(--success)',
  successDim: 'var(--success-dim)',
  warning:    'var(--warning)',
  warningDim: 'var(--warning-dim)',

  // Model palette - matches CSS vars
  efficientnet: 'var(--c-efficientnet)',
  resnet:       'var(--c-resnet)',
  mobilenet:    'var(--c-mobilenet)',
  densenet:     'var(--c-densenet)',
};

// Typography
export const FONTS = {
  display: "'Syne', sans-serif",
  mono:    "'DM Mono', monospace",
};

// Models
// Derived from notebook results: EfficientNetB0, ResNet50, MobileNetV2, DenseNet121
export const MODEL_META = {
  EfficientNetB0: {
    key:          'EfficientNetB0',
    name:         'EfficientNetB0',
    architecture: 'EfficientNet',
    parameters:   5300000,
    color:        COLORS.efficientnet,
    testAcc:      1.00,
    bestValAcc:   0.9992,
    f1:           1.0000,
    description:  'Compound-scaled CNN - best accuracy/efficiency trade-off.',
  },
  ResNet50: {
    key:          'ResNet50',
    name:         'ResNet50',
    architecture: 'ResNet',
    parameters:   25600000,
    color:        COLORS.resnet,
    testAcc:      1.00,
    bestValAcc:   0.9994,
    f1:           1.0000,
    description:  'Deep residual network with skip connections.',
  },
  MobileNetV2: {
    key:          'MobileNetV2',
    name:         'MobileNetV2',
    architecture: 'MobileNet',
    parameters:   3400000,
    color:        COLORS.mobilenet,
    testAcc:      0.99,
    bestValAcc:   0.9900,
    f1:           0.9881,
    description:  'Lightweight depthwise-separable convolutions.',
  },
  DenseNet121: {
    key:          'DenseNet121',
    name:         'DenseNet121',
    architecture: 'DenseNet',
    parameters:   8000000,
    color:        COLORS.densenet,
    testAcc:      1.00,
    bestValAcc:   0.9956,
    f1:           1.0000,
    description:  'Dense connections from each layer to every other layer.',
  },
};

export const MODEL_LIST = Object.values(MODEL_META);

// Routes
export const ROUTES = {
  HOME:    '/',
  DETECT:  '/detect',
  METRICS: '/metrics',
  ABOUT:   '/about',
};

// API
// New Node.js Server (Server/) - NOT the old Python backend
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const API_ENDPOINTS = {
  PREDICT: '/api/predict',
  HEALTH:  '/health',
};

// Validation
export const VALIDATION = {
  MAX_FILE_SIZE:       5 * 1024 * 1024,
  ALLOWED_TYPES:       ['image/jpeg', 'image/jpg', 'image/png'],
  ALLOWED_EXTENSIONS:  ['.jpg', '.jpeg', '.png'],
};
