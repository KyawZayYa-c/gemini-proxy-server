import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { proxyGeminiRequest } from './src/controllers/geminiController.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log('🔍 GEMINI_URL from .env:', process.env.GEMINI_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/gemini-proxy', proxyGeminiRequest);

app.listen(PORT, () => {
    console.log(`✅ Gemini Proxy Server running on port ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/health`);
});