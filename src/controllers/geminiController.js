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

                IMPORTANT RULES:
                1. Answer the user's question directly and helpfully
                2. Structure your answer in 3 parts:
                - INTRODUCTION : Briefly introduce the topic
                - MAIN CONTENT : Detailed explanation
                - CONCLUSION : Summary and final advice

                3. Length depends on the question:
                - Simple question → Short and clear
                - Complex question → Detailed but complete

                4. NEVER cut off mid-sentence
                5. Always end with a proper conclusion
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