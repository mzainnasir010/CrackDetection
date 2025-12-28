"""
FastAPI Backend for Concrete Crack Detection System
Main application entry point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routes import prediction, history
from utils.model_loader import model_loader


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle manager for FastAPI app.
    Loads models on startup and cleans up on shutdown.
    """
    # Startup: Load all models
    print("\n" + "="*60)
    print("[STARTUP] Starting Concrete Crack Detection API Server")
    print("="*60)
    
    try:
        model_loader.load_all_models()
        print("[SUCCESS] Server ready to accept requests!\n")
    except Exception as e:
        print(f"[ERROR] Failed to load models: {e}")
        raise
    
    yield
    
    # Shutdown
    print("\n[INFO] Shutting down server...")


# Create FastAPI app
app = FastAPI(
    title="Concrete Crack Detection API",
    description="Deep Learning API for comparing VGG16 and ResNet50 models in crack detection",
    version="1.0.0",
    lifespan=lifespan
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174","http://localhost:5173", "http://localhost:3000"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(prediction.router, prefix="/api", tags=["Prediction"])
app.include_router(history.router, prefix="/api", tags=["History"])


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "Concrete Crack Detection API",
        "status": "running",
        "models_loaded": model_loader.is_loaded(),
        "available_models": model_loader.get_all_model_keys()
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "models": {
            key: "loaded" if model_loader.get_model(key) is not None else "not loaded"
            for key in model_loader.get_all_model_keys()
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
