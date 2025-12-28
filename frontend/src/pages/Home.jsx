// Dashboard (formerly Home)
import { motion } from 'framer-motion';
import { ArrowRight, Image, CheckCircle, Smartphone, Activity, BarChart2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/UI/StatsCard';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-indigo-600 text-white p-8 lg:p-12 shadow-glow">
                <div className="relative z-10 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            AI-Powered concrete <br />
                            <span className="text-blue-200">Crack Detection</span>
                        </h1>
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
                            Detect structural defects instantly with 99.8% accuracy using our advanced VGG16 & ResNet50 ensemble models.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/analysis">
                                <Button size="lg" className="bg-white text-secondary hover:bg-blue-50 border-none shadow-xl">
                                    Start Analysis
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/models">
                                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                                    View Metrics
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-7.1C81.5,6.2,70.2,18.5,59.6,29.1C49,39.7,39.1,48.6,27.9,56.6C16.7,64.7,4.2,71.8,-6.4,68.1C-17,64.4,-25.8,49.9,-36.4,39.6C-47,29.3,-59.4,23.1,-68.4,12.8C-77.4,2.5,-83,-11.9,-79.3,-24.1C-75.6,-36.3,-62.6,-46.3,-49.8,-53.9C-37,-61.5,-24.4,-66.7,-11.3,-69.3C1.8,-71.9,14.9,-72,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </section>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Model Accuracy"
                    value="99.8%"
                    icon={CheckCircle}
                    color="success"
                    trend="up"
                    trendValue="+2.4%"
                />
                <StatsCard
                    title="Avg Inference"
                    value="120ms"
                    icon={Activity}
                    color="primary"
                    trend="down"
                    trendValue="-15ms"
                />
                <StatsCard
                    title="Models Active"
                    value="4"
                    icon={BarChart2}
                    color="warning"
                />
                <StatsCard
                    title="Parameters"
                    value="164M+"
                    icon={Shield}
                    color="danger"
                />
            </div>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-slate-800">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 text-primary">
                        <Image className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Smart Preprocessing</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Automatic resizing, normalization, and noise reduction ensures optimal analysis conditions.
                    </p>
                </Card>

                <Card className="bg-white dark:bg-slate-800">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ensemble Analysis</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Simultaneous inference from VGG16 and ResNet50 models for robust decision making.
                    </p>
                </Card>

                <Card className="bg-white dark:bg-slate-800">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Responsive Design</h3>
                    <p className="text-slate-500 dark:text-slate-400">
                        Fully optimized interface that works seamlessly across desktop, tablet, and mobile devices.
                    </p>
                </Card>
            </section>
        </div>
    );
};

export default Home;
