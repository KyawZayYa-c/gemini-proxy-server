import { callGeminiAPI } from '../services/geminiService.js';

export const proxyGeminiRequest = async (req, res) => {
    try {
        const { message, feature, customInstructions } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                reply: 'Message is required'
            });
        }

        let prompt = '';

        if (customInstructions) {
            prompt = `${customInstructions}\n\nUser: ${message}`;
        } else {
            const baseInstruction = `You are a helpful AI assistant.

            Answer the user's question directly and helpfully.

            IMPORTANT RULES:
            1. Provide COMPLETE and THOROUGH answers
            2. NEVER cut off mid-sentence
            3. Structure your answer with:
            - Start with an introduction paragraph
            - Follow with detailed explanation with bullet points or numbered lists if helpful
            - End with a conclusion paragraph
            4. Do NOT use any markdown headings like ## or ###
            5. Keep paragraphs flowing naturally
            6. Keep answers practical and easy to understand

            User Question: ${message}`;

            prompt = baseInstruction;
        }

        const result = await callGeminiAPI(prompt);

        res.json({
            success: result.success,
            reply: result.reply,
            feature: feature || 'general'
        });

    } catch (error) {
        console.error('❌ Controller Error:', error.message);
        res.status(500).json({
            success: false,
            reply: 'Please try again later...',
            feature: 'general'
        });
    }
};