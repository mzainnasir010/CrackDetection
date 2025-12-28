# 🏗️ Concrete Crack Detection System

A professional full-stack web application that compares **VGG16** and **ResNet50** deep learning models for automated concrete crack detection in structural inspections.

![Project Status](https://img.shields.io/badge/status-active-success)
![Python](https://img.shields.io/badge/python-3.9+-blue)
![React](https://img.shields.io/badge/react-18+-blue)
![TensorFlow](https://img.shields.io/badge/tensorflow-2.18-orange)

## 📖 Overview

This system showcases the power of deep learning in infrastructure maintenance by comparing different CNN architectures and training strategies. Users can upload concrete images and receive instant predictions from four different models, each with unique characteristics:

- **VGG16 Baseline** - Classic architecture without augmentation
- **VGG16 Augmented** - Improved with data augmentation
- **ResNet50 Baseline** - Residual network without augmentation
- **ResNet50 Augmented** - Best performer at 99.8% accuracy

## ✨ Features

### 🔍 Real-time Detection
- Upload concrete images via drag-and-drop or click
- Get instant predictions from multiple models simultaneously
- View confidence scores and inference times

### 📊 Model Comparison
- Interactive charts showing training history
- Side-by-side accuracy and loss visualizations
- Comprehensive metrics comparison table

### 🎨 Modern UI/UX
-Minimalistic, elegant design with Tailwind CSS
- Smooth animations powered by Framer Motion
- Fully responsive for all devices
- Glassmorphism and subtle gradients

### ⚡ High Performance
- Models cached in memory for fast inference
- Inference times under 2 seconds
- Concurrent predictions across all models

## 🏗️ Project Structure

```
project-root/
├── backend/                 # FastAPI backend
│   ├── models/             # Keras model files (.keras)
│   ├── data/               # Training history (pickle)
│   ├── utils/              # Model loader, image processor
│   ├── routes/             # API endpoints (prediction, history)
│   ├── main.py            # FastAPI app entry point
│   ├── requirements.txt   # Python dependencies
│   └── README.md          # Backend documentation
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components (Home, Detection, etc.)
│   │   ├── services/      # API service (Axios)
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Helper functions and constants
│   ├── package.json       # Node dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind customization
│   └── README.md          # Frontend documentation
│
├── deep-learning-lab-project.ipynb  # Training notebook
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

Backend will run at `http://localhost:8000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run at `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Health Check
- `GET /` - Basic server status
- `GET /health` - Detailed health check with model status

### Prediction
- `POST /api/predict` - Run crack detection on uploaded image
- `POST /api/upload` - Upload image file (multipart/form-data)

### Model Information
- `GET /api/model-history` - Training history for all models
- `GET /api/model-info` - Model metadata and specifications

## 🧠 Model Performance

| Model | Parameters | Final Accuracy | Final Loss | Training Type |
|-------|-----------|----------------|------------|---------------|
| VGG16 Baseline | 138M | 99.4% | 0.0334 | No Augmentation |
| VGG16 Augmented | 138M | 99.6% | 0.0280 | With Augmentation |
| ResNet50 Baseline | 25.6M | 80.6% | 0.4262 | No Augmentation |
| **ResNet50 Augmented** | **25.6M** | **99.8%** | **0.0150** | **With Augmentation** |

### Key Insights
✅ Data augmentation dramatically improved ResNet50 (from 80.6% to 99.8%)  
✅ ResNet50 is 5.4x more parameter-efficient than VGG16  
✅ All augmented models achieved >99% accuracy  
✅ ResNet50 Augmented offers best balance of accuracy and efficiency  

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow 2.18** - Deep learning framework
- **Keras** - High-level neural network API
- **Pillow** - Image processing
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Charting library
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 🎨 Design System

### Color Palette
- **Primary**: `#1a1a1a` (Almost Black)
- **Secondary**: `#f5f5f5` (Off White)
- **Accent**: `#3b82f6` (Subtle Blue)
- **Success**: `#10b981` (Green for "No Crack")
- **Warning**: `#ef4444` (Red for "Crack Detected")

### Typography
- **Headings**: Inter (600-700 weight)
- **Body**: Inter (400 weight)
- **Monospace**: JetBrains Mono (for metrics)

## 📸 Screenshots

> Add screenshots here after running the application

## 🧪 Testing

### Backend Testing
```bash
# Start backend server
cd backend
uvicorn main:app --reload

# Test with curl
curl http://localhost:8000/health
curl http://localhost:8000/api/model-info
```

### Frontend Testing
```bash
# Start frontend dev server
cd frontend
npm run dev

# Test in browser at http://localhost:5173
```

### End-to-End Testing
1. Upload a concrete crack image
2. Select all 4 models
3. Click "Analyze Image"
4. Verify predictions appear with confidence bars
5. Check that inference time is < 5 seconds total

## 📝 Usage Guide

### Detecting Cracks

1. **Navigate to Live Detection** (`/detect`)
2. **Upload Image**: Drag and drop or click to select a concrete image (JPG/PNG, max 5MB)
3. **Select Models**: Choose which models to compare (default: all 4)
4. **Analyze**: Click "Analyze Image" button
5. **View Results**: See predictions with confidence scores and inference times
6. **Compare**: Review the quick comparison summary

### Viewing Model Performance

1. **Navigate to Model Comparison** (`/compare`)
2. **Explore Charts**: Interactive training/validation accuracy and loss charts
3. **Review Table**: See final metrics for all models
4. **Read Insights**: Key takeaways about model performance

## 🐛 Troubleshooting

### Backend Issues

**Models not loading:**
- Ensure all `.keras` files are in `backend/models/` directory
- Check TensorFlow installation: `pip install --upgrade tensorflow`

**CORS errors:**
- Verify CORS configuration in `backend/main.py` includes frontend URL

### Frontend Issues

**Blank page:**
- Check browser console for errors
- Ensure backend is running on port 8000
- Verify all npm dependencies are installed

**Charts not rendering:**
- Check `/api/model-history` endpoint returns valid data
- Ensure Recharts is installed: `npm install recharts`

**Tailwind styles not applied:**
- Run `npm install` to ensure PostCSS and Tailwind are installed
- Check that `tailwind.config.js` exists

## 📚 Documentation

- [Backend README](./backend/README.md) - API documentation, model loading, endpoints
- [Frontend README](./frontend/README.md) - Component architecture, hooks, pages

## 🤝 Contributing

This is an academic project for Deep Learning Lab. For improvements or suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a Deep Learning Lab course.

## 👥 Team

**Deep Learning Lab - End Semester Project**

## 🙏 Acknowledgments

- TensorFlow and Keras teams for the deep learning framework
- FastAPI for the excellent web framework
- React and Vite teams for modern frontend tooling
- Training dataset contributors

---

**Built with ❤️ for Deep Learning Lab**
