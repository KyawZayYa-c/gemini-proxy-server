import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
];

export const callGeminiAPI = async (prompt) => {
    let lastError = null;
    
    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 16384,
            topP: 0.95,
            topK: 40
        }
    };

    for (const model of MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
            
            console.log(`📤 Trying model: ${model}`);
            
            const response = await axios.post(
                `${url}?key=${GEMINI_API_KEY}`,
                requestBody,
                { 
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 120000 
                }
            );
            
            const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!reply) {
                throw new Error('No reply from Gemini API');
            }
            
            console.log(`✅ Success with model: ${model}`);
            
            return { 
                success: true, 
                reply: reply 
            };
            
        } catch (error) {
            const status = error.response?.status;
            console.log(`❌ Model ${model} failed: ${status || error.message}`);
            
            if (status === 503 || status === 429) {
                console.log(`⚠️ Model ${model} is busy, trying next...`);
                lastError = error;
                continue;
            }
            
            console.error('❌ Fatal error:', error.message);
            return {
                success: false,
                reply: 'Please try again later.'
            };
        }
    }
    
    console.error('❌ All models failed');
    return {
        success: false,
        reply: 'Current AI work busy. So please try again later.'
    };
};