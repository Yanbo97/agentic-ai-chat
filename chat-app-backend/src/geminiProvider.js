import { GoogleGenAI } from "@google/genai";
class GeminiProvider {
    constructor(apiKey, modelId) {
        this.apiKey = apiKey;
        this.modelName = modelId;

        if(!this.apiKey || !this.modelName) {
            throw new Error("API key and Model ID must be provided");
        }
    }
    async generateResponse(prompt) {
        // try{
        //     const genAI = new GoogleGenAI(this.apiKey);
        //     const response = await genAI.models.generateContent({
        //         model: this.modelName,
        //         contents: prompt,
        //     })
        //     return response.text || "No response generated";
        // } catch (error) {
        //     console.error("Error generating response from Gemini API:", error?.stack || error);
        //     throw error;
        // }
        // mock for local test
        return `Mock reply for: ${prompt}`;
    }
    
}
export default GeminiProvider;