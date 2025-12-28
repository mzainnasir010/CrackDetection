"""
Image Processing Utility
Handles image validation, preprocessing, and conversion for the API.
"""

import io
import base64
from typing import Tuple, Optional
from PIL import Image
import numpy as np


class ImageProcessor:
    """Utility class for image processing operations."""
    
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
    TARGET_SIZE = (224, 224)
    
    @staticmethod
    def validate_image(file_content: bytes, filename: str) -> Tuple[bool, Optional[str]]:
        """
        Validate image file type and size.
        
        Args:
            file_content: Raw file bytes
            filename: Original filename
        
        Returns:
            (is_valid, error_message) tuple
        """
        # Check file size
        if len(file_content) > ImageProcessor.MAX_FILE_SIZE:
            return False, f"File size exceeds {ImageProcessor.MAX_FILE_SIZE // (1024*1024)}MB limit"
        
        # Check file extension
        file_ext = filename.split('.')[-1].lower()
        if file_ext not in ImageProcessor.ALLOWED_EXTENSIONS:
            return False, f"Invalid file type. Allowed: {', '.join(ImageProcessor.ALLOWED_EXTENSIONS)}"
        
        # Try to open as image
        try:
            img = Image.open(io.BytesIO(file_content))
            img.verify()
            return True, None
        except Exception as e:
            return False, f"Invalid image file: {str(e)}"
    
    @staticmethod
    def decode_base64_image(base64_string: str) -> Tuple[Optional[Image.Image], Optional[str]]:
        """
        Decode base64 encoded image string.
        
        Args:
            base64_string: Base64 encoded image (with or without data URI prefix)
        
        Returns:
            (PIL Image, error_message) tuple
        """
        try:
            # Remove data URI prefix if present
            if ',' in base64_string:
                base64_string = base64_string.split(',')[1]
            
            # Decode base64
            image_bytes = base64.b64decode(base64_string)
            
            # Open as PIL Image
            image = Image.open(io.BytesIO(image_bytes))
            return image, None
        except Exception as e:
            return None, f"Error decoding base64 image: {str(e)}"
    
    @staticmethod
    def prepare_image_for_model(image: Image.Image) -> np.ndarray:
        """
        Convert PIL Image to numpy array ready for model input.
        
        Args:
            image: PIL Image object
        
        Returns:
            NumPy array of shape (height, width, 3)
        """
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize to target size
        image = image.resize(ImageProcessor.TARGET_SIZE, Image.LANCZOS)
        
        # Convert to numpy array
        image_array = np.array(image, dtype=np.float32)
        
        return image_array
    
    @staticmethod
    def create_thumbnail(image: Image.Image, max_size: Tuple[int, int] = (400, 400)) -> str:
        """
        Create a base64 encoded thumbnail preview of the image.
        
        Args:
            image: PIL Image object
            max_size: Maximum dimensions for thumbnail
        
        Returns:
            Base64 encoded thumbnail string with data URI prefix
        """
        try:
            # Create thumbnail
            image_copy = image.copy()
            image_copy.thumbnail(max_size, Image.LANCZOS)
            
            # Convert to base64
            buffer = io.BytesIO()
            image_copy.save(buffer, format='JPEG', quality=85)
            buffer.seek(0)
            
            img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
            return f"data:image/jpeg;base64,{img_base64}"
        except Exception as e:
            print(f"Error creating thumbnail: {e}")
            return ""
    
    @staticmethod
    def bytes_to_pil(file_content: bytes) -> Image.Image:
        """
        Convert raw bytes to PIL Image.
        
        Args:
            file_content: Raw image bytes
        
        Returns:
            PIL Image object
        """
        return Image.open(io.BytesIO(file_content))
