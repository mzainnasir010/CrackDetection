const axios = require('axios');
const fs = require('fs');

const MODELS = ["EfficientNetB0", "ResNet50", "MobileNetV2", "DenseNet121"];

async function predictWithModel(imagePath, modelName) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    const response = await axios.post(
        process.env.HF_SPACE_URL,
        { image: dataUrl, model_name: modelName },
        { headers: { 'Content-Type': 'application/json' }, timeout: 60000 }
    );

    const { crack, noCrack } = response.data;
    return { model: modelName, crack, noCrack };
}

async function predictAllModels(imagePath, selectedModels = MODELS) {
    const results = await Promise.all(
        selectedModels.map(modelName =>
            predictWithModel(imagePath, modelName)
                .catch(err => ({ model: modelName, error: err.message }))
        )
    );
    return results;
}

module.exports = { predictAllModels, MODELS };