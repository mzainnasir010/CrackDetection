import clsx from 'clsx';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    icon: Icon,
    loading,
    disabled,
    onClick,
    type = 'button',
    ...props
}) => {
    const variants = {
        primary: "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30",
        secondary: "bg-secondary-light dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800",
        danger: "bg-danger text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : Icon ? (
                <Icon className={clsx("w-5 h-5", children && "mr-2")} />
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
