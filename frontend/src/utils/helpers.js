// src/utils/helpers.js
import { VALIDATION } from '../theme';

export const formatConfidence = (v) => `${(v * 100).toFixed(1)}%`;

export const formatTime = (s) => s < 1 ? `${(s * 1000).toFixed(0)}ms` : `${s.toFixed(2)}s`;

export const validateImageFile = (file) => {
  if (!file) return { isValid: false, error: 'No file selected' };
  if (!VALIDATION.ALLOWED_TYPES.includes(file.type))
    return { isValid: false, error: `Invalid type. Allowed: ${VALIDATION.ALLOWED_EXTENSIONS.join(', ')}` };
  if (file.size > VALIDATION.MAX_FILE_SIZE)
    return { isValid: false, error: `File exceeds ${VALIDATION.MAX_FILE_SIZE / 1048576}MB limit` };
  return { isValid: true, error: null };
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.readAsDataURL(file);
    r.onload  = () => resolve(r.result);
    r.onerror = (e) => reject(e);
  });
