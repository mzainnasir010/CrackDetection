// ComparisonTable component for model metrics

import Card from '../UI/Card';
import Badge from '../UI/Badge';

const ComparisonTable = ({ modelInfo, historyData }) => {
    if (!modelInfo || !historyData) {
        return (
            <Card className="p-6">
                <p className="text-neutral text-center">No data available</p>
            </Card>
        );
    }

    // Get final metrics from last epoch
    const lastEpoch = historyData.epochs?.[historyData.epochs.length - 1];

    const rows = modelInfo.models.map((model) => {
        const key = model.key;
        const finalAcc = lastEpoch?.[`${key}_val_acc`] || lastEpoch?.[`${key}_train_acc`] || 0;
        const finalLoss = lastEpoch?.[`${key}_val_loss`] || lastEpoch?.[`${key}_train_loss`] || 0;

        return {
            name: model.name,
            architecture: model.architecture,
            trainingType: model.training_type,
            finalAccuracy: finalAcc,
            finalLoss: finalLoss,
            parameters: model.parameters,
        };
    });

    return (
        <Card className="p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Model Metrics Summary</h3>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral uppercase tracking-wide">
                                Model
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-neutral uppercase tracking-wide">
                                Type
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral uppercase tracking-wide">
                                Final Accuracy
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral uppercase tracking-wide">
                                Final Loss
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-neutral uppercase tracking-wide">
                                Parameters
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-smooth"
                            >
                                <td className="py-3 px-4 font-medium text-primary">
                                    {row.name}
                                </td>
                                <td className="py-3 px-4">
                                    <Badge variant={row.trainingType === 'Augmented' ? 'augmented' : 'baseline'}>
                                        {row.trainingType}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 text-right font-mono font-semibold text-success">
                                    {(row.finalAccuracy * 100).toFixed(1)}%
                                </td>
                                <td className="py-3 px-4 text-right font-mono">
                                    {row.finalLoss.toFixed(4)}
                                </td>
                                <td className="py-3 px-4 text-right font-mono text-sm text-neutral">
                                    {(row.parameters / 1000000).toFixed(1)}M
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ComparisonTable;
