"""
Prediction API Routes
Handles image upload and model prediction requests.
"""

import time
from typing import List, Optional
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
import numpy as np

from utils.model_loader import model_loader
from utils.image_processor import ImageProcessor


router = APIRouter()


class PredictionRequest(BaseModel):
    """Request model for prediction endpoint."""
    image: str  # Base64 encoded image
    models: Optional[List[str]] = None  # List of model keys to use


class PredictionResult(BaseModel):
    """Single model prediction result."""
    model: str
    model_name: str
    prediction: str  # 'crack' or 'no_crack'
    confidence: float  # 0-1 range
    inference_time: float  # seconds


class PredictionResponse(BaseModel):
    """Response model for prediction endpoint."""
    predictions: List[PredictionResult]
    image_preview: str  # Base64 thumbnail
    timestamp: str


@router.post("/predict", response_model=PredictionResponse)
async def predict_image(request: PredictionRequest):
    """
    Predict concrete cracks using selected models.
    
    Args:
        request: PredictionRequest containing base64 image and model selection
    
    Returns:
        PredictionResponse with results from all selected models
    """
    try:
        # Decode base64 image
        image_pil, error = ImageProcessor.decode_base64_image(request.image)
        if error:
            raise HTTPException(status_code=400, detail=error)
        
        # Create thumbnail preview
        thumbnail = ImageProcessor.create_thumbnail(image_pil)
        
        # Prepare image for models
        image_array = ImageProcessor.prepare_image_for_model(image_pil)
        
        # Default to all models if none specified
        selected_models = request.models or model_loader.get_all_model_keys()
        
        # Validate model keys
        valid_keys = model_loader.get_all_model_keys()
        for model_key in selected_models:
            if model_key not in valid_keys:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid model key: {model_key}. Valid keys: {valid_keys}"
                )
        
        # Run predictions
        predictions = []
        for model_key in selected_models:
            try:
                # Get model
                model = model_loader.get_model(model_key)
                if model is None:
                    raise HTTPException(status_code=500, detail=f"Model {model_key} not loaded")
                
                # Preprocess for this specific model
                preprocessed = model_loader.preprocess_image(image_array, model_key)
                
                # Run inference
                start_time = time.time()
                prediction = model.predict(preprocessed, verbose=0)
                inference_time = time.time() - start_time
                
                # Parse prediction
                raw_probs = prediction[0]
                
                # Standard Mapping based on Training Notebook:
                # Index 0 = 'negative' (No Crack)
                # Index 1 = 'positive' (Crack)
                
                predicted_class = int(np.argmax(raw_probs))
                confidence = float(raw_probs[predicted_class])
                
                prediction_label = "crack" if predicted_class == 1 else "no_crack"
                
                # DEBUG: Logic Trace
                print(f"[DEBUG] {model_key} | Raw: {raw_probs} | Argmax: {predicted_class} | Label: {prediction_label}")

                # Get model info
                model_info = model_loader.get_model_info(model_key)
                
                predictions.append(PredictionResult(
                    model=model_key,
                    model_name=model_info['name'],
                    prediction=prediction_label,
                    confidence=confidence,
                    inference_time=round(inference_time, 3)
                ))
                
            except Exception as e:
                print(f"Error during prediction with {model_key}: {e}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Prediction failed for {model_key}: {str(e)}"
                )
        
        # Return response
        from datetime import datetime
        return PredictionResponse(
            predictions=predictions,
            image_preview=thumbnail,
            timestamp=datetime.now().isoformat()
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Unexpected error in predict_image: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """
    Upload image file directly (multipart/form-data).
    
    Args:
        file: Uploaded file
    
    Returns:
        Success status and file info
    """
    try:
        # Read file content
        content = await file.read()
        
        # Validate image
        is_valid, error = ImageProcessor.validate_image(content, file.filename)
        if not is_valid:
            raise HTTPException(status_code=400, detail=error)
        
        # Convert to PIL and create preview
        image_pil = ImageProcessor.bytes_to_pil(content)
        preview = ImageProcessor.create_thumbnail(image_pil)
        
        return {
            "success": True,
            "filename": file.filename,
            "preview_url": preview,
            "size": len(content)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
