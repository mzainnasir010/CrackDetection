// Custom hook for fetching model training history

import { useState, useEffect } from 'react';
import { getModelHistory } from '../services/api';

/**
 * Custom hook for fetching and managing model history data
 * @param {boolean} autoFetch - Whether to fetch on mount
 * @returns {Object} History state and functions
 */
export const useModelHistory = (autoFetch = true) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [chartData, setChartData] = useState([]);

    /**
     * Fetch model history from API
     */
    const fetchHistory = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getModelHistory();
            setHistoryData(response);

            // Format data for Recharts
            if (response.epochs) {
                setChartData(response.epochs);
            }

            setLoading(false);
            return response;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    /**
     * Refetch history data
     */
    const refetch = () => {
        return fetchHistory();
    };

    // Auto-fetch on mount if enabled
    useEffect(() => {
        if (autoFetch) {
            fetchHistory();
        }
    }, [autoFetch]);

    return {
        loading,
        error,
        historyData,
        chartData,
        fetchHistory,
        refetch,
    };
};
