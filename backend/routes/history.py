"""
Model History API Routes
Handles requests for training history and model metadata.
"""

import pickle
from pathlib import Path
from typing import Dict, List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


from utils.model_loader import model_loader
import os
import json

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_HISTORY_PATH = os.path.join(BASE_DIR, 'data', 'static_history.json')
HISTORY_FILE_PATH = os.path.join(BASE_DIR, 'training_history.pkl')



router = APIRouter()


class EpochData(BaseModel):
    """Data for a single training epoch."""
    epoch: int
    vgg16_baseline_train_acc: Optional[float] = None
    vgg16_baseline_train_loss: Optional[float] = None
    vgg16_baseline_val_acc: Optional[float] = None
    vgg16_baseline_val_loss: Optional[float] = None
    vgg16_augmented_train_acc: Optional[float] = None
    vgg16_augmented_train_loss: Optional[float] = None
    vgg16_augmented_val_acc: Optional[float] = None
    vgg16_augmented_val_loss: Optional[float] = None
    resnet50_baseline_train_acc: Optional[float] = None
    resnet50_baseline_train_loss: Optional[float] = None
    resnet50_baseline_val_acc: Optional[float] = None
    resnet50_baseline_val_loss: Optional[float] = None
    resnet50_augmented_train_acc: Optional[float] = None
    resnet50_augmented_train_loss: Optional[float] = None
    resnet50_augmented_val_acc: Optional[float] = None
    resnet50_augmented_val_loss: Optional[float] = None


class ModelHistoryResponse(BaseModel):
    """Response containing training history for all models."""
    epochs: List[EpochData]
    model_names: List[str]


class ModelInfoItem(BaseModel):
    """Information about a single model."""
    name: str
    key: str
    architecture: str
    training_type: str
    parameters: int
    layers: int


class ModelInfoResponse(BaseModel):
    """Response containing metadata for all models."""
    models: List[ModelInfoItem]


# Cache for history data
_history_cache = None


def load_history_data() -> Dict:
    """Load and cache experiment history from pickle file."""
    """Load training history from static JSON (preferred) or pickle file (fallback)."""
    global _history_cache
    
    if _history_cache is not None:
        return _history_cache
    
    # 1. Try Static JSON
    if os.path.exists(STATIC_HISTORY_PATH):
        try:
            print(f"✅ Loading history from static JSON: {STATIC_HISTORY_PATH}")
            with open(STATIC_HISTORY_PATH, 'r') as f:
                _history_cache = json.load(f)
                return _history_cache
        except Exception as e:
            print(f"❌ Error loading static history JSON: {e}")
    
    # 2. Fallback to Pickle
    if os.path.exists(HISTORY_FILE_PATH):
        try:
            print(f"✅ Loading history from pickle: {HISTORY_FILE_PATH}")
            with open(HISTORY_FILE_PATH, 'rb') as f:
                _history_cache = pickle.load(f)
                return _history_cache
        except Exception as e:
            print(f"❌ Error loading history pickle: {e}")
    
    # 3. If both fail, raise an error
    error_msg = "No history data found. Checked static JSON and pickle files."
    print(f"❌ {error_msg}")
    raise FileNotFoundError(error_msg)


@router.get("/model-history", response_model=ModelHistoryResponse)
async def get_model_history():
    """
    Get training history for all models.
    
    Returns:
        ModelHistoryResponse with epoch-by-epoch training data
    """
    try:
        history_data = load_history_data()
        
        # Determine max number of epochs across all models
        num_epochs = 0
        model_keys = model_loader.get_all_model_keys()
        
        for model_key in model_keys:
            if model_key in history_data:
                model_data = history_data[model_key]
                # Handle nested history structure
                history = model_data.get('history', {}) if 'history' in model_data else model_data
                
                # Check accuracy length
                if 'accuracy' in history:
                    num_epochs = max(num_epochs, len(history['accuracy']))

        print(f"[INFO] Max epochs found: {num_epochs}")
        
        # Format data for frontend (Recharts expects array of objects)
        epochs_list = []
        
        for i in range(num_epochs):
            epoch_data = {'epoch': i + 1}
            
            # Add data for each model
            for model_key in model_keys:
                if model_key in history_data:
                    model_data = history_data[model_key]
                    history = model_data.get('history', {}) if 'history' in model_data else model_data
                    
                    # Helper to safely get value
                    def get_val(metric_name, idx):
                        if metric_name in history and idx < len(history[metric_name]):
                            return float(history[metric_name][idx])
                        return None

                    # Training accuracy
                    val = get_val('accuracy', i)
                    if val is not None: epoch_data[f"{model_key}_train_acc"] = val
                    
                    # Training loss
                    val = get_val('loss', i)
                    if val is not None: epoch_data[f"{model_key}_train_loss"] = val
                    
                    # Validation accuracy
                    val = get_val('val_accuracy', i)
                    if val is not None: epoch_data[f"{model_key}_val_acc"] = val
                    
                    # Validation loss
                    val = get_val('val_loss', i)
                    if val is not None: epoch_data[f"{model_key}_val_loss"] = val
            
            epochs_list.append(epoch_data)
        
        return ModelHistoryResponse(
            epochs=epochs_list,
            model_names=model_loader.get_all_model_keys()
        )
        
    except Exception as e:
        print(f"Error in get_model_history: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load history: {str(e)}")


@router.get("/model-info", response_model=ModelInfoResponse)
async def get_model_info():
    """
    Get metadata and information about all available models.
    
    Returns:
        ModelInfoResponse with model specifications
    """
    try:
        models_list = []
        
        for model_key in model_loader.get_all_model_keys():
            info = model_loader.get_model_info(model_key)
            
            models_list.append(ModelInfoItem(
                name=info['name'],
                key=model_key,
                architecture=info['architecture'],
                training_type=info['training_type'],
                parameters=info['parameters'],
                layers=info['layers']
            ))
        
        return ModelInfoResponse(models=models_list)
        
    except Exception as e:
        print(f"Error in get_model_info: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to load model info: {str(e)}")
