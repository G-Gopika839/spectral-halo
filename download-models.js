import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODELS_DIR = path.join(__dirname, 'public', 'models');
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const files = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_landmark_68_model-weights_manifest.json',
    'face_landmark_68_model-shard1',
    'face_expression_model-weights_manifest.json',
    'face_expression_model-shard1'
];

if (!fs.existsSync(MODELS_DIR)) {
    fs.mkdirSync(MODELS_DIR, { recursive: true });
}

const downloadFile = (filename) => {
    const file = fs.createWriteStream(path.join(MODELS_DIR, filename));
    const url = `${BASE_URL}/${filename}`;

    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${filename}: ${response.statusCode}`);
            return;
        }
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(path.join(MODELS_DIR, filename), () => { }); // Delete the file async. (But we don't check the result)
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
};

console.log(`Downloading models to ${MODELS_DIR}...`);
files.forEach(downloadFile);
