
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Card from '../components/UI/Card';
import { useModelHistory } from '../hooks/useModelHistory';
import { getModelInfo } from '../services/api';

const ModelComparison = () => {
    const { loading, error, chartData } = useModelHistory(true);
    const [modelInfo, setModelInfo] = useState(null);

    useEffect(() => {
        const fetchModelInfo = async () => {
            try {
                const data = await getModelInfo();
                setModelInfo(data);
            } catch (err) {
                console.error('Failed to fetch model info:', err);
            }
        };
        fetchModelInfo();
    }, []);

    // Generate colors dynamically
    const getModelColor = (index, type) => {
        const baseColors = [
            '#6366f1', // Indigo (Primary)
            '#ef4444', // Red
            '#10b981', // Green
            '#f59e0b', // Amber
            '#8b5cf6', // Violet
            '#ec4899', // Pink
            '#06b6d4', // Cyan
        ];
        const color = baseColors[index % baseColors.length];

        // Return different opacity or shade for baseline vs augmented if desired
        // For now, let's keep it simple: different color for each model key
        return color;
    };

    if (loading) return <div className="flex h-[50vh] items-center justify-center"><LoadingSpinner /></div>;
    if (error) return <div className="text-center p-12 text-red-500">Error loading data: {error}</div>;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-4 !border-none !shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl">
                    <p className="font-bold mb-2">Epoch {label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm mb-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-slate-500 dark:text-slate-400">{entry.name}:</span>
                            <span className="font-mono font-medium">{(entry.value * 100).toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const getBestAccuracy = (modelKey) => {
        if (!chartData || chartData.length === 0) return 0;

        // The data keys are formatted as `${modelKey}_val_acc` in the backend
        const key = `${modelKey}_val_acc`;

        // Extract all values for this key, filtering out undefined/null
        const values = chartData.map(d => d[key]).filter(v => v !== undefined && v !== null);

        if (values.length === 0) return 0;

        return Math.max(...values);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Model Metrics</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Detailed performance comparison across training epochs
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-lg font-bold mb-6">Training Accuracy</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="epoch" stroke="#94a3b8" />
                                <YAxis domain={[0, 1]} stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                {modelInfo?.models.map((model, index) => (
                                    <Line
                                        key={`${model.key}-train`}
                                        type="monotone"
                                        dataKey={`${model.key}_train_acc`}
                                        name={`${model.name}`}
                                        stroke={getModelColor(index)}
                                        dot={false}
                                        strokeWidth={2}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-lg font-bold mb-6">Validation Accuracy</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="epoch" stroke="#94a3b8" />
                                <YAxis domain={[0, 1]} stroke="#94a3b8" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                {modelInfo?.models.map((model, index) => (
                                    <Line
                                        key={`${model.key}-val`}
                                        type="monotone"
                                        dataKey={`${model.key}_val_acc`}
                                        name={`${model.name}`}
                                        stroke={getModelColor(index)}
                                        dot={{ r: 3 }}
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Comparison Table */}
            <Card className="overflow-hidden">
                <h3 className="text-lg font-bold mb-6">Architecture Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="pb-4 font-semibold text-slate-500">Model Name</th>
                                <th className="pb-4 font-semibold text-slate-500">Architecture</th>
                                <th className="pb-4 font-semibold text-slate-500">Parameters</th>
                                <th className="pb-4 font-semibold text-slate-500">Training Type</th>
                                <th className="pb-4 font-semibold text-slate-500">Accuracy (Best)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {modelInfo?.models.map((model) => (
                                <tr key={model.key} className="group">
                                    <td className="py-4 font-medium text-slate-800 dark:text-slate-200">{model.name}</td>
                                    <td className="py-4 text-slate-500">{model.architecture}</td>
                                    <td className="py-4 font-mono text-sm text-slate-400">{(model.parameters / 1000000).toFixed(1)}M</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${model.training_type === 'Augmented'
                                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                            }`}>
                                            {model.training_type}
                                        </span>
                                    </td>
                                    <td className="py-4 font-bold text-success">
                                        {(getBestAccuracy(model.key) * 100).toFixed(1)}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ModelComparison;
