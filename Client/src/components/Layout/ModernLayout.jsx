import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const ModernLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background dark:bg-background-dark text-text-main dark:text-text-inverted transition-colors duration-300">
            <Sidebar />

            <main className="pl-20 lg:pl-64 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-7xl mx-auto p-4 lg:p-8"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default ModernLayout;
