import { motion } from 'framer-motion';

const ConfidenceBar = ({ label, confidence, threshold = 0.5, minimal = false }) => {
    const percentage = Math.round(confidence * 100);
    const isHigh = confidence > 0.8;
    const isMedium = confidence > threshold && confidence <= 0.8;

    // Determine color based on new design system
    let colorClass = "bg-slate-400";
    if (isHigh) colorClass = "bg-success";
    else if (isMedium) colorClass = "bg-warning";

    return (
        <div className="w-full">
            {!minimal && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{percentage}%</span>
                </div>
            )}

            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${colorClass}`}
                />
            </div>

            {!minimal && (
                <div className="flex justify-between mt-1 text-xs text-slate-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            )}
        </div>
    );
};

export default ConfidenceBar;
