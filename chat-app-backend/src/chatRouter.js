import express from 'express';  
import GeminiProvider from './geminiProvider.js';  
const router = express.Router();
router.post('/chat', async(req, res) => {
    const message = req.body?.message;
    // message from frontend
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }
    console.log("Received message:", message);

    try{
        const gemini = new GeminiProvider(process.env.GEMINI_API_KEY, process.env.GEMINI_MODEL_ID);
        const responseMessage = await gemini.generateResponse(message);
        console.log("Generated response:", responseMessage);
        res.json({ reply: responseMessage });
    }catch(error){
        console.error("Error generating response:", error?.stack || error);
        return res.status(500).json({ error: 'Failed to generate response from the AI' });
    }
    
});
export default router;