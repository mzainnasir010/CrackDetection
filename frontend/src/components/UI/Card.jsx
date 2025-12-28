import clsx from 'clsx';
import { motion } from 'framer-motion';

const Card = ({ children, className, hover = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
            className={clsx(
                "glass-card rounded-2xl p-6 transition-all duration-300",
                hover && "hover:shadow-glow hover:border-primary/20",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
