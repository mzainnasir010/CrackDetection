const cron = require('node-cron');
const axios = require('axios');

function startPingService() {
    // every 4 minutes HF sleeps after 5 mins of inactivity
    cron.schedule('*/4 * * * *', async () => {
        try {
            const healthUrl = process.env.HF_SPACE_URL.replace('/predict', '/health');
            await axios.get(healthUrl, { timeout: 10000 });
            console.log(`[PING] HF Space alive - ${new Date().toISOString()}`);
        } catch (err) {
            console.warn(`[PING] HF Space ping failed - ${err.message}`);
        }
    });

    console.log('[PING] Ping service started (pinging HF every 4 minutes)');
}

module.exports = { startPingService };