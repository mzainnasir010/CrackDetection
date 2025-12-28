# Concrete Crack Detection - Backend API

FastAPI backend serving deep learning models for concrete crack detection.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload

# Or using Python directly
python main.py
```

The server will start at `http://localhost:8000`

## 📡 API Endpoints

### Health Check
- **GET /** - Basic health check
- **GET /health** - Detailed health status

### Prediction
- **POST /api/predict** - Run crack detection on image
  ```json
  {
    "image": "base64_encoded_image_string",
    "models": ["vgg16_baseline", "vgg16_augmented", "resnet50_baseline", "resnet50_augmented"]
  }
  ```
  
- **POST /api/upload** - Upload image file (multipart/form-data)

### Model Information
- **GET /api/model-history** - Get training history for all models
- **GET /api/model-info** - Get model metadata and specifications

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── requirements.txt        # Python dependencies
├── models/                 # Keras model files (.keras)
├── data/                   # Training history data
├── uploads/                # Temporary uploaded images
├── utils/
│   ├── model_loader.py    # Model loading and caching
│   └── image_processor.py # Image validation and preprocessing
└── routes/
    ├── prediction.py      # Prediction endpoints
    └── history.py         # History and info endpoints
```

## 🤖 Available Models

1. **VGG16 Baseline** - VGG16 trained without data augmentation
2. **VGG16 Augmented** - VGG16 trained with data augmentation
3. **ResNet50 Baseline** - ResNet50 trained without data augmentation
4. **ResNet50 Augmented** - ResNet50 trained with data augmentation

All models are loaded at server startup and cached in memory for fast inference.

## 🔧 Configuration

- **CORS**: Configured to allow requests from `localhost:5173` (Vite) and `localhost:3000`
- **Image Size**: All images resized to 224x224
- **Max Upload**: 5MB per file
- **Allowed Formats**: JPG, JPEG, PNG

## 📊 Response Format

### Prediction Response
```json
{
  "predictions": [
    {
      "model": "vgg16_baseline",
      "model_name": "VGG16 Baseline",
      "prediction": "crack",
      "confidence": 0.985,
      "inference_time": 2.1
    }
  ],
  "image_preview": "data:image/jpeg;base64,...",
  "timestamp": "2025-12-28T10:30:00Z"
}
```

## 🧪 Testing

You can test the API using:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **curl**, Postman, or any HTTP client

Example with curl:
```bash
# Health check
curl http://localhost:8000/health

# Get model info
curl http://localhost:8000/api/model-info
```

## 📝 Notes

- Models are loaded once at startup - first request will not have loading delay
- All preprocessing (resize, normalize) is handled automatically
- Binary classification: 0 = no_crack, 1 = crack
- Inference time includes only model prediction, not preprocessing

## 🐛 Troubleshooting

**Models not loading:**
- Ensure all .keras files are in `models/` directory
- Check TensorFlow installation: `pip install tensorflow`

**CORS errors:**
- Update allowed origins in `main.py` if using different ports

**Out of memory:**
- Models are large (~100MB each). Ensure sufficient RAM (recommended: 8GB+)
