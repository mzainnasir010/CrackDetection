const { predictAllModels, MODELS } = require('../services/hfService');
const fs = require('fs');

async function predict(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        // convert uploaded image to base64
        const imageBase64 = fs.readFileSync(req.file.path, { encoding: 'base64' });
        const mimeType = req.file.mimetype;
        const imageDataUrl = `data:${mimeType};base64,${imageBase64}`;

        // get selected models from body, default to all
        let selectedModels = req.body.models;
        if (selectedModels) {
            selectedModels = JSON.parse(selectedModels);
        } else {
            selectedModels = MODELS;
        }

        // validate model names
        const invalid = selectedModels.filter(m => !MODELS.includes(m));
        if (invalid.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Invalid model(s): ${invalid.join(', ')}. Valid: ${MODELS.join(', ')}`
            });
        }

        const results = await predictAllModels(req.file.path, selectedModels);

        // cleanup uploaded file
        fs.unlinkSync(req.file.path);

        return res.json({ success: true, results });

    } catch (err) {
        console.error('[PREDICT]', err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { predict };