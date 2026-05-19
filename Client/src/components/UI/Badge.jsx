// Badge component for labels

const Badge = ({
    children,
    variant = 'default',
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';

    const variants = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-red-100 text-red-800',
        vgg16: 'bg-blue-100 text-blue-700',
        resnet: 'bg-orange-100 text-orange-700',
        baseline: 'bg-purple-100 text-purple-700',
        augmented: 'bg-green-100 text-green-700',
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
