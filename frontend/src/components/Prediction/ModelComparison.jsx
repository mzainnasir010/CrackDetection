// ModelComparison component for quick summary

import { motion } from 'framer-motion';
import { Trophy, Zap, Target } from 'lucide-react';
import Card from '../UI/Card';
import { formatConfidence, formatTime } from '../../utils/helpers';

const ModelComparison = ({ predictions }) => {
    if (!predictions || predictions.length === 0) return null;

    // Find best accuracy
    const bestAccuracy = predictions.reduce((best, current) =>
        current.confidence > best.confidence ? current : best
    );

    // Find fastest model
    const fastest = predictions.reduce((fast, current) =>
        current.inference_time < fast.inference_time ? current : fast
    );

    // Calculate average confidence
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Card className="p-6 glass">
                <h3 className="text-lg font-bold text-primary mb-4">Quick Comparison</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Best Accuracy */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs text-neutral font-medium uppercase tracking-wide mb-1">
                                Best Accuracy
                            </p>
                            <p className="text-lg font-bold text-primary">{bestAccuracy.model_name}</p>
                            <p className="text-sm text-neutral font-mono">
                                {formatConfidence(bestAccuracy.confidence)}
                            </p>
                        </div>
                    </div>

                    {/* Fastest Model */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Zap className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-neutral font-medium uppercase tracking-wide mb-1">
                                Fastest
                            </p>
                            <p className="text-lg font-bold text-primary">{fastest.model_name}</p>
                            <p className="text-sm text-neutral font-mono">
                                {formatTime(fastest.inference_time)}
                            </p>
                        </div>
                    </div>

                    {/* Average Confidence */}
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Target className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-neutral font-medium uppercase tracking-wide mb-1">
                                Average Confidence
                            </p>
                            <p className="text-lg font-bold text-primary font-mono">
                                {formatConfidence(avgConfidence)}
                            </p>
                            <p className="text-sm text-neutral">
                                Across {predictions.length} models
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ModelComparison;
