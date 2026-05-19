import clsx from 'clsx';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "primary" }) => {
    const colorStyles = {
        primary: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-danger/10 text-danger",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 text-text-main dark:text-text-inverted">{value}</h3>
                </div>
                <div className={clsx("p-3 rounded-xl", colorStyles[color])}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={clsx(
                        "font-medium",
                        trend === 'up' ? "text-success" : "text-danger"
                    )}>
                        {trendValue}
                    </span>
                    <span className="ml-2 text-slate-400">vs last month</span>
                </div>
            )}
        </motion.div>
    );
};

export default StatsCard;
