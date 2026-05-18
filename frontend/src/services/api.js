/**
 * api.js - Frontend service layer for the Node.js Server (Server/).
 *
 * The new server exposes a single route:
 *   POST /api/predict  multipart/form-data
 *     fields: image (file), models (JSON string array, optional)
 *
 * Response:
 *   { success: true, results: [{ model, crack, noCrack }] }
 *
 * This module normalises that into the shape the Detect page already expects:
 *   { predictions: [{ model, model_name, prediction, confidence, crack_prob, inference_time }] }
 */

import { API_BASE, API_ENDPOINTS, MODEL_META, MODEL_LIST } from '../theme';

// helpers

function dataUrlToFile(dataUrl, filename = 'image.jpg') {
  const [header, b64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(b64);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
  return new File([arr], filename, { type: mime });
}

function normalise(raw, startMs) {
  const { model, crack, noCrack, error } = raw;
  if (error) throw new Error(`${model}: ${error}`);

  const crackProb   = typeof crack === 'number' ? crack : crack / 100;
  const noCrackProb = typeof noCrack === 'number' ? noCrack : noCrack / 100;
  const prediction  = crackProb > 0.5 ? 'crack' : 'no_crack';
  const confidence  = prediction === 'crack' ? crackProb : noCrackProb;
  const meta        = MODEL_META[model] || {};

  return {
    model,
    model_name:     meta.name || model,
    prediction,
    confidence,
    crack_prob:     crackProb,
    inference_time: (Date.now() - startMs) / 1000,
  };
}

// public api

// api for predict image
export const predictImage = async (imageDataUrl, models = null) => {
  const file = dataUrlToFile(imageDataUrl, 'image.jpg');
  const selectedModels = models || MODEL_LIST.map(m => m.key);

  const fd = new FormData();
  fd.append('image', file);
  fd.append('models', JSON.stringify(selectedModels));

  const startMs = Date.now();
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.PREDICT}`, {
    method: 'POST',
    body: fd,
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || `Server error ${res.status}`);
  }

  const predictions = json.results.map(r => normalise(r, startMs));
  return { predictions };
};

// api for health check
export const healthCheck = async () => {
  const res = await fetch(`${API_BASE}${API_ENDPOINTS.HEALTH}`);
  return res.json();
};

export default { predictImage, healthCheck };
