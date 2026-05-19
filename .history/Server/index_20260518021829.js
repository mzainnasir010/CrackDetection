require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { startPingService } = require('./services/pingService');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

// health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// routes
app.use('/api', predictionRoutes);

// startup health check: verify HF Space is reachable
async function checkHFOnStartup() {
    try {
        console.log('[STARTUP] Checking HF Space availability...');
        const healthUrl = process.env.HF_SPACE_URL.replace('/predict', '/health');
        await axios.get(healthUrl, { timeout: 15000 });
        console.log('[STARTUP] HF Space is reachable ✓');
    } catch (err) {
        console.warn('[STARTUP] HF Space not reachable yet (may be sleeping) —', err.message);
    }
}

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await checkHFOnStartup();
    startPingService();
});