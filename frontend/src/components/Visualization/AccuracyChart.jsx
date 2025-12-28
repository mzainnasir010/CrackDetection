// AccuracyChart component for training accuracy visualization

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MODEL_COLORS } from '../../utils/constants';
import Card from '../UI/Card';

const AccuracyChart = ({ data, title = 'Training Accuracy', dataKeys }) => {
    if (!data || data.length === 0) {
        return (
            <Card className="p-6">
                <p className="text-neutral text-center">No data available</p>
            </Card>
        );
    }

    const colors = [
        MODEL_COLORS.vgg16_baseline,
        MODEL_COLORS.vgg16_augmented,
        MODEL_COLORS.resnet50_baseline,
        MODEL_COLORS.resnet50_augmented,
    ];

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-primary mb-4">{title}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="epoch"
                        label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                        domain={[0, 1]}
                        label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                        }}
                    />
                    <Legend />

                    {dataKeys && dataKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[index % colors.length]}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default AccuracyChart;
