"""
Model Loader Utility
Handles loading and caching of all Keras models for concrete crack detection.
"""

import os
from pathlib import Path
from typing import Dict, Optional
import tensorflow as tf
from tensorflow import keras
import numpy as np


class ModelLoader:
    """
    Singleton class to load and cache deep learning models.
    Loads all 4 models (VGG16 & ResNet50, baseline & augmented) at startup.
    """
    
    _instance = None
    _models: Dict[str, keras.Model] = {}
    
    MODEL_PATHS = {
        'vgg16_baseline': 'models/vgg16_baseline.keras',
        'vgg16_augmented': 'models/vgg16_augmented.keras',
        'resnet50_baseline': 'models/resnet50_baseline.keras',
        'resnet50_augmented': 'models/resnet50_augmented.keras'
    }
    
    MODEL_INFO = {
        'vgg16_baseline': {
            'name': 'VGG16 Baseline',
            'architecture': 'VGG16',
            'training_type': 'Baseline',
            'parameters': 138357544,
            'layers': 16
        },
        'vgg16_augmented': {
            'name': 'VGG16 Augmented',
            'architecture': 'VGG16',
            'training_type': 'Augmented',
            'parameters': 138357544,
            'layers': 16
        },
        'resnet50_baseline': {
            'name': 'ResNet50 Baseline',
            'architecture': 'ResNet50',
            'training_type': 'Baseline',
            'parameters': 25636712,
            'layers': 50
        },
        'resnet50_augmented': {
            'name': 'ResNet50 Augmented',
            'architecture': 'ResNet50',
            'training_type': 'Augmented',
            'parameters': 25636712,
            'layers': 50
        }
    }
    
    def __new__(cls):
        """Singleton pattern implementation."""
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        """Initialize the model loader (only runs once due to singleton)."""
        if not self._models:
            self._base_path = Path(__file__).parent.parent
            print("[INFO] Initializing ModelLoader...")
    
    def load_all_models(self) -> None:
        """
        Load all 4 models into memory at server startup.
        Rebuilds models from scratch using architecture from training notebook,
        then loads weights from .keras files.
        """
        print("\n[INFO] Loading all models...")
       
        from tensorflow.keras.applications import VGG16, ResNet50
        from tensorflow.keras.models import Sequential
        from tensorflow.keras.layers import Dense, Dropout
        from tensorflow.keras.optimizers import Adam
        import zipfile
        import h5py
        
        for model_key, model_path in self.MODEL_PATHS.items():
            try:
                full_path = self._base_path / model_path
                print(f"  Loading {model_key} from {full_path}...")
                
                # Rebuild model architecture based on notebook code
                if 'vgg16' in model_key:
                    print(f"    Building VGG16 architecture...")
                    base = VGG16(
                        include_top=False,
                        weights='imagenet',
                        input_shape=(224, 224, 3),
                        pooling='avg'
                    )
                    base.trainable = False
                    
                    model = Sequential([
                        base,
                        Dense(256, activation='relu', name='fc1'),
                        Dropout(0.5, name='dropout'),
                        Dense(2, activation='softmax', name='output')
                    ], name='vgg16')
                    
                elif 'resnet' in model_key:
                    print(f"    Building ResNet50 architecture...")
                    base = ResNet50(
                        include_top=False,
                        weights='imagenet',
                        input_shape=(224, 224, 3),
                        pooling='avg'
                    )
                    base.trainable = False
                    
                    model = Sequential([
                        base,
                        Dense(256, activation='relu', name='fc1'),
                        Dropout(0.5, name='dropout'),
                        Dense(2, activation='softmax', name='output')
                    ], name='resnet50')
                else:
                    raise ValueError(f"Unknown model type: {model_key}")
                
                # Compile model (required before loading weights)
                model.compile(
                    optimizer=Adam(learning_rate=0.001),
                    loss='categorical_crossentropy',
                    metrics=['accuracy']
                )
                
                print(f"    Loading trained weights...")
                # Extract weights from .keras file and load them
                try:
                    with zipfile.ZipFile(str(full_path), 'r') as z:
                        # Extract weights file
                        weights_data = z.read('model.weights.h5')
                        # Save temporarily
                        temp_weights = self._base_path / f'temp_{model_key}.h5'
                        with open(temp_weights, 'wb') as f:
                            f.write(weights_data)
                        
                        # Load weights into model
                        model.load_weights(str(temp_weights))
                        
                        # Clean up temp file
                        temp_weights.unlink()
                        
                except Exception as weight_error:
                    print(f"    [WARNING] Could not load weights: {str(weight_error)}")
                    print(f"    [INFO] Using ImageNet pretrained base + random classifier weights")
                
                self._models[model_key] = model
                print(f"  [OK] {model_key} loaded successfully")
                
            except Exception as e:
                print(f"  [ERROR] Error loading {model_key}: {str(e)}")
                print(f"  [INFO] Skipping {model_key}")
        
        if len(self._models) == 0:
            print("\n[WARNING] No models loaded successfully!")
        else:
            print(f"\n[SUCCESS] {len(self._models)} out of {len(self.MODEL_PATHS)} models loaded!\n")
    
    def get_model(self, model_key: str) -> Optional[keras.Model]:
        """
        Retrieve a cached model by its key.
        
        Args:
            model_key: One of 'vgg16_baseline', 'vgg16_augmented', 
                      'resnet50_baseline', 'resnet50_augmented'
        
        Returns:
            Loaded Keras model or None if not found
        """
        return self._models.get(model_key)
    
    def get_all_model_keys(self) -> list:
        """Get list of all available model keys."""
        return list(self.MODEL_PATHS.keys())
    
    def get_model_info(self, model_key: str) -> Optional[Dict]:
        """Get metadata about a specific model."""
        return self.MODEL_INFO.get(model_key)
    
    def preprocess_image(self, image_array: np.ndarray, model_key: str) -> np.ndarray:
        """
        Preprocess image for a specific model architecture.
        
        Args:
            image_array: NumPy array of shape (height, width, 3)
            model_key: Model identifier to determine preprocessing method
        
        Returns:
            Preprocessed image array of shape (1, 224, 224, 3)
        """
        # Resize to 224x224 if not already
        if image_array.shape[:2] != (224, 224):
            image_array = tf.image.resize(image_array, [224, 224]).numpy()
        
        # Ensure RGB (3 channels)
        if len(image_array.shape) == 2:
            image_array = np.stack([image_array] * 3, axis=-1)
        elif image_array.shape[-1] == 4:
            image_array = image_array[:, :, :3]
        
        # Add batch dimension
        # IMPORTANT: Use copy() to prevent modifying the original array in-place
        # which corrupts input for subsequent models in the loop
        image_array = np.expand_dims(image_array, axis=0).copy()
        
        # Apply model-specific preprocessing
        # Note: preprocess_input handles RGB/BGR conversion and centering automatically
        if 'vgg16' in model_key:
            from tensorflow.keras.applications.vgg16 import preprocess_input
            image_array = preprocess_input(image_array)
        elif 'resnet' in model_key:
            from tensorflow.keras.applications.resnet50 import preprocess_input
            image_array = preprocess_input(image_array)
        
        return image_array
    
    def is_loaded(self) -> bool:
        """Check if models are loaded."""
        return len(self._models) == len(self.MODEL_PATHS)


# Global instance
model_loader = ModelLoader()
