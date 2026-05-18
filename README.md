# 🏗️ Concrete Crack Detection System

A professional full-stack web application that leverages advanced deep learning models to automatically detect cracks in concrete structures. It evaluates images against four state-of-the-art CNN architectures to provide reliable, real-time analysis for structural inspections.

![Project Status](https://img.shields.io/badge/status-active-success)
![Node.js](https://img.shields.io/badge/node.js-18+-green)
![React](https://img.shields.io/badge/react-18+-blue)
![Vite](https://img.shields.io/badge/vite-latest-purple)

## 📖 Overview

This system showcases the power of deep learning in infrastructure maintenance by comparing different CNN architectures and training strategies. Users can upload concrete images or use sample analysis to receive instant predictions from four different models, each with unique characteristics:

- **EfficientNetB0** - Compound-scaled CNN with the best accuracy/efficiency trade-off.
- **ResNet50** - Deep residual network with skip connections.
- **MobileNetV2** - Lightweight architecture utilizing depthwise-separable convolutions.
- **DenseNet121** - Dense connections from each layer to every other layer.

## ✨ Features

### 🔍 Real-time Detection
- Upload concrete images via drag-and-drop or select from quick samples.
- Get instant predictions from multiple models simultaneously via Hugging Face inference endpoints.
- View confidence scores, crack probabilities, and real-time inference latency.

### 📊 Model Comparison & Metrics
- Interactive charts showing training history and cross-model performance.
- Side-by-side accuracy, validation loss, and F1-score visualizations.
- Comprehensive metrics comparison table.

### 🎨 Modern UI/UX
- Elegant, premium interface featuring dark/light mode and glassmorphism.
- Dynamic data visualization powered by Recharts.
- Smooth animations and transitions.

## 🏗️ Project Structure

```text
project-root/
├── Server/                 # Node.js/Express backend
│   ├── .env               # Server environment variables
│   ├── index.js           # Express app entry point
│   ├── hfService.js       # HuggingFace API integration service
│   ├── package.json       # Node dependencies
│   └── routes/            # API endpoints (prediction routing)
│
├── frontend/               # React / Vite frontend
│   ├── .env               # Frontend environment variables
│   ├── src/
│   │   ├── components/    # Reusable React UI components (Glassmorphism layout)
│   │   ├── pages/         # Page components (Home, Detect, Metrics, About)
│   │   ├── services/      # API service (fetch client)
│   │   └── theme.js       # Centralized theme tokens and model metadata
│   ├── package.json       # Node dependencies
│   └── vite.config.js     # Vite configuration
│
├── notebook/               # Jupyter Notebooks containing the model training logic
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to the Server directory
cd Server

# Install Node dependencies
npm install

# Setup environment variables
# Ensure your .env has any necessary HF Tokens or configurations required
# Start the Express server
npm run dev
```

The backend server will run at `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install Node dependencies
npm install

# Create environment variable file
echo "VITE_API_BASE=http://localhost:5000" > .env

# Start the Vite development server
npm run dev
```

The frontend will run at `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Basic server status to verify frontend-backend communication

### Prediction
- `POST /api/predict` - Run crack detection on an uploaded image (`multipart/form-data`)

## 🧠 Model Performance

| Model | Parameters | Test Accuracy | Best Val Acc | F1 Score | Architecture Type |
|-------|-----------|----------------|------------|---------------|---------------|
| **EfficientNetB0** | 5.3M | 100% | 99.92% | 1.0000 | Compound-scaled CNN |
| **ResNet50** | 25.6M | 100% | 99.94% | 1.0000 | Residual Network |
| **MobileNetV2** | 3.4M | 99.0% | 99.00% | 0.9881 | Depthwise Separable |
| **DenseNet121** | 8.0M | 100% | 99.56% | 1.0000 | Dense Network |

### Key Insights
✅ **Perfect Test Accuracy**: EfficientNetB0, ResNet50, and DenseNet121 all achieved flawless 100% test accuracy on the concrete crack dataset.  
✅ **Efficiency**: EfficientNetB0 provides the best trade-off, achieving 100% accuracy with nearly 5x fewer parameters than ResNet50.  
✅ **Lightweight**: MobileNetV2 remains extremely lightweight (3.4M parameters) while maintaining highly competitive accuracy (99%).  

## 🛠️ Technology Stack

### Backend
- **Node.js & Express** - Efficient web server.
- **Multer** - Middleware for handling `multipart/form-data` uploads.
- **Hugging Face API** - Connects to cloud-hosted Hugging Face spaces for live model inference.

### Frontend
- **React 18** - UI library.
- **Vite** - High-performance build tool and dev server.
- **Vanilla CSS** - Custom CSS mapping with design tokens.
- **Recharts** - Data visualization and metric charting.
- **Lucide React** - Icon library.

## 📝 Usage Guide

### Detecting Cracks
1. **Navigate to Live Detection** (`/detect`)
2. **Upload Image**: Drag and drop or click to select a concrete image, or choose a "Quick Analysis" sample.
3. **Select Models**: Choose which models to compare.
4. **Analyze**: Click the "Run Analysis" button.
5. **View Results**: See predictions alongside confidence scores and inference times.

### Viewing Model Performance
1. **Navigate to Model Metrics** (`/metrics`)
2. **Explore Charts**: View interactive training/validation accuracy and loss charts for each model.
3. **Review Metrics**: See the final accuracy, F1-scores, and parameter counts side by side.

## 📄 License
This project is created for educational purposes as part of a Deep Learning Lab course.

## 👥 Team
**Deep Learning Lab - End Semester Project**

---
**Built with ❤️ for Deep Learning Lab**
