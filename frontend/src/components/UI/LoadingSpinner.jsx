// Loading Spinner component

import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({
    size = 'md',
    color = 'text-primary',
    text = null,
    className = '',
}) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <Loader2 className={`${sizes[size]} ${color} animate-spin`} />
            {text && (
                <p className="text-neutral text-sm font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
