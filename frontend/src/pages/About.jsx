// About page - Project information

import { motion } from 'framer-motion';
import { Brain, Code, Database, LineChart } from 'lucide-react';
import Card from '../components/UI/Card';

const About = () => {
    const technologies = [
        {
            category: 'Deep Learning',
            icon: Brain,
            items: ['TensorFlow 2.18', 'Keras', 'VGG16 Architecture', 'ResNet50 Architecture'],
        },
        {
            category: 'Backend',
            icon: Database,
            items: ['FastAPI', 'Python 3.9+', 'Uvicorn', 'Pillow'],
        },
        {
            category: 'Frontend',
            icon: Code,
            items: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
        },
        {
            category: 'Deployment',
            icon: LineChart,
            items: ['RESTful API', 'CORS Enabled', 'Model Caching', 'Real-time Inference'],
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    About This Project
                </h1>
                <p className="text-neutral">
                    A comprehensive deep learning system for concrete crack detection
                </p>
            </motion.div>

            {/* Project Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
            >
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Project Overview</h2>
                    <div className="space-y-4 text-neutral">
                        <p>
                            This full-stack web application demonstrates the power of deep learning in
                            automated infrastructure inspection. By comparing two popular convolutional
                            neural network architectures (VGG16 and ResNet50), we showcase how different
                            training strategies and model designs impact performance on crack detection tasks.
                        </p>
                        <p>
                            The system allows users to upload concrete images and receive instant predictions
                            from four different models, providing insights into how data augmentation and
                            architecture choices affect accuracy and inference time.
                        </p>
                    </div>
                </Card>
            </motion.div>

            {/* Model Architecture Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Model Architecture Comparison</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* VGG16 */}
                        <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <h3 className="text-xl font-bold text-blue-700 mb-3">VGG16</h3>
                            <ul className="space-y-2 text-neutral">
                                <li className="flex justify-between">
                                    <span>Layers:</span>
                                    <span className="font-mono font-semibold">16</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Parameters:</span>
                                    <span className="font-mono font-semibold">138M</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Baseline Accuracy:</span>
                                    <span className="font-mono font-semibold">99.4%</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Augmented Accuracy:</span>
                                    <span className="font-mono font-semibold">99.6%</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-neutral">
                                Deep architecture with small 3x3 convolution filters. Known for simplicity
                                and effectiveness.
                            </p>
                        </div>

                        {/* ResNet50 */}
                        <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                            <h3 className="text-xl font-bold text-orange-700 mb-3">ResNet50</h3>
                            <ul className="space-y-2 text-neutral">
                                <li className="flex justify-between">
                                    <span>Layers:</span>
                                    <span className="font-mono font-semibold">50</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Parameters:</span>
                                    <span className="font-mono font-semibold">25.6M</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Baseline Accuracy:</span>
                                    <span className="font-mono font-semibold">80.6%</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Augmented Accuracy:</span>
                                    <span className="font-mono font-semibold">99.8%</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-sm text-neutral">
                                Uses residual connections to enable training of very deep networks with fewer parameters.
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
            >
                <h2 className="text-2xl font-bold text-primary mb-6">Technologies Used</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {technologies.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                            <motion.div
                                key={tech.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <Card className="p-6 hover" hover>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-accent/10 rounded-lg">
                                            <Icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <h3 className="text-lg font-bold text-primary">{tech.category}</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {tech.items.map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-neutral">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Features */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Real-time Detection</h3>
                            <p className="text-neutral text-sm">
                                Upload images and get instant predictions from multiple models simultaneously
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Model Comparison</h3>
                            <p className="text-neutral text-sm">
                                Compare performance metrics side-by-side to understand trade-offs
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Training Visualization</h3>
                            <p className="text-neutral text-sm">
                                Interactive charts showing accuracy and loss curves over training epochs
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary mb-2">Responsive Design</h3>
                            <p className="text-neutral text-sm">
                                Fully responsive interface that works seamlessly on all devices
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default About;
