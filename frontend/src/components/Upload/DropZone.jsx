// DropZone component for drag-and-drop file upload

import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

const DropZone = ({ onDrop, isDragging, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-smooth
        ${isDragging
                    ? 'border-accent bg-blue-50'
                    : 'border-gray-300 hover:border-accent hover:bg-gray-50'
                }
      `}
        >
            <div className="flex flex-col items-center gap-4">
                {isDragging ? (
                    <Upload className="w-16 h-16 text-accent animate-bounce" />
                ) : (
                    <ImageIcon className="w-16 h-16 text-neutral" />
                )}

                <div>
                    <p className="text-lg font-semibold text-primary mb-2">
                        {isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'}
                    </p>
                    <p className="text-sm text-neutral">
                        Supported formats: JPG, PNG (Max 5MB)
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default DropZone;
