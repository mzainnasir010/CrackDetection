
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, AlertCircle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ConfidenceBar from '../components/Visualization/ConfidenceBar';
import { usePrediction } from '../hooks/usePrediction';
import { getModelInfo } from '../services/api';

const LiveDetection = () => {
    const { loading, error, predictions, predict, reset } = usePrediction();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Fetch available models on mount
    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await getModelInfo();
                if (data && data.models) {
                    setAvailableModels(data.models);
                    // Default select all
                    setSelectedModels(data.models.map(m => m.key));
                }
            } catch (err) {
                console.error("Failed to fetch models:", err);
            }
        };
        fetchModels();
    }, []);

    const toggleModel = (modelKey) => {
        if (selectedModels.includes(modelKey)) {
            setSelectedModels(selectedModels.filter(k => k !== modelKey));
        } else {
            setSelectedModels([...selectedModels, modelKey]);
        }
    };

    // Calculate ensemble result from predictions array
    const result = predictions.length > 0 ? (() => {
        const crackCount = predictions.filter(p => p.prediction === 'crack').length;
        const totalConf = predictions.reduce((acc, p) => acc + p.confidence, 0);
        const avgConf = totalConf / predictions.length;

        // Simple majority vote for detection
        const has_crack = crackCount >= (predictions.length / 2);

        return {
            has_crack,
            confidence: avgConf,
            details: predictions
        };
    })() : null;

    const handleFileSelect = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selected = e.dataTransfer.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleAnalyze = () => {
        if (file) {
            predict(file, selectedModels);
        }
    };

    const clearSelection = () => {
        setFile(null);
        setPreview(null);
        reset();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">Live Analysis</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Upload an image of a concrete surface to instantly detect cracks and assess structural integrity.
                </p>
                <Button
                    variant="outline"
                    onClick={() => navigate('/models')}
                    className="gap-2"
                >
                    <Activity className="w-4 h-4" />
                    View Detailed Model Comparison
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                    <Card className="flex flex-col min-h-[500px]">
                        <h2 className="text-xl font-bold mb-6">Input Image</h2>

                        <div className="flex-1 relative">
                            {!preview ? (
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="h-full min-h-[300px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group"
                                >
                                    <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors mb-4">
                                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="font-medium text-slate-600 dark:text-slate-300">
                                        Click or drag image here
                                    </p>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Supports JPG, PNG (Max 5MB)
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                            ) : (
                                <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center group">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="max-w-full max-h-[400px] object-contain shadow-lg"
                                    />
                                    <button
                                        onClick={clearSelection}
                                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Model Selection */}
                    <Card>
                        <h3 className="font-bold mb-4">Select Models to Use</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {availableModels.length > 0 ? (
                                availableModels.map((model) => (
                                    <label
                                        key={model.key}
                                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedModels.includes(model.key)
                                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                                            checked={selectedModels.includes(model.key)}
                                            onChange={() => toggleModel(model.key)}
                                        />
                                        <div className="ml-3">
                                            <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {model.name}
                                            </span>
                                            <span className="block text-xs text-slate-500">
                                                {model.architecture} • {model.training_type}
                                            </span>
                                        </div>
                                    </label>
                                ))
                            ) : (
                                <div className="col-span-2 text-center py-4 text-slate-400">
                                    <LoadingSpinner size="sm" />
                                    <span className="ml-2">Loading models...</span>
                                </div>
                            )}
                        </div>
                    </Card>

                    <div className="flex justify-end">
                        <Button
                            onClick={handleAnalyze}
                            disabled={!file || loading || selectedModels.length === 0}
                            loading={loading}
                            size="lg"
                            className="w-full lg:w-auto min-w-[200px]"
                        >
                            {loading ? 'Analyzing Structure...' : 'Analyze Image'}
                        </Button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 rounded-xl flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    {!result && !loading && (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl min-h-[400px]">
                            <Activity className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">Results will appear here</p>
                        </div>
                    )}

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Main Prediction Card */}
                                <Card className={result.has_crack ? 'border-l-4 border-l-danger' : 'border-l-4 border-l-success'}>
                                    <h3 className="text-lg font-medium text-slate-500 mb-1">Ensemble Result</h3>
                                    <div className="flex items-end justify-between">
                                        <h2 className={`text-4xl font-bold ${result.has_crack ? 'text-danger' : 'text-success'}`}>
                                            {result.has_crack ? 'Crack Detected' : 'No Crack'}
                                        </h2>
                                        <span className="text-2xl font-bold text-slate-800 dark:text-white">
                                            {(result.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <ConfidenceBar
                                            label="Overall Confidence"
                                            confidence={result.confidence}
                                            threshold={0.5}
                                        />
                                    </div>
                                </Card>

                                {/* Detailed Model Breakdown */}
                                <Card>
                                    <h3 className="font-bold mb-4 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-primary" />
                                        Model Consensus
                                    </h3>
                                    <div className="space-y-4">
                                        {result.details.map((model) => (
                                            <div key={model.model} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-medium capitalize">{model.model_name}</span>
                                                    <span className={model.prediction === 'crack' ? 'text-danger' : 'text-success'}>
                                                        {model.prediction === 'crack' ? 'Positive' : 'Negative'}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${model.prediction === 'crack' ? 'bg-danger' : 'bg-success'}`}
                                                        style={{ width: `${model.confidence * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default LiveDetection;
