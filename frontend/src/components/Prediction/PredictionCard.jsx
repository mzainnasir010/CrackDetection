// PredictionCard component to display individual model results

import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import ConfidenceBar from './ConfidenceBar';
import { formatTime, getPredictionBgColor } from '../../utils/helpers';

const PredictionCard = ({ prediction, index = 0 }) => {
    const { model, model_name, prediction: result, confidence, inference_time } = prediction;

    const isCrack = result === 'crack';
    const icon = isCrack ? AlertCircle : CheckCircle2;
    const Icon = icon;
    const iconColor = isCrack ? 'text-warning' : 'text-success';
    const bgColor = getPredictionBgColor(result);

    // Determine badge variant based on model
    let badgeVariant = 'default';
    if (model.includes('vgg16')) badgeVariant = 'vgg16';
    if (model.includes('resnet')) badgeVariant = 'resnet';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Card className="p-6 hover">
                {/* Model Name Badge */}
                <div className="flex items-center justify-between mb-4">
                    <Badge variant={badgeVariant}>{model_name}</Badge>
                    <div className="flex items-center gap-1 text-xs text-neutral">
                        <Clock className="w-3 h-3" />
                        <span className="font-mono">{formatTime(inference_time)}</span>
                    </div>
                </div>

                {/* Prediction Result */}
                <div className={`${bgColor} rounded-lg p-4 mb-4`}>
                    <div className="flex items-center gap-3">
                        <Icon className={`w-8 h-8 ${iconColor}`} />
                        <div className="flex-1">
                            <p className="text-xs text-neutral font-medium uppercase tracking-wide mb-1">
                                Detection Result
                            </p>
                            <p className={`text-2xl font-bold ${isCrack ? 'text-warning' : 'text-success'}`}>
                                {isCrack ? 'CRACK DETECTED' : 'NO CRACK'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Confidence Bar */}
                <ConfidenceBar confidence={confidence} prediction={result} />
            </Card>
        </motion.div>
    );
};

export default PredictionCard;
