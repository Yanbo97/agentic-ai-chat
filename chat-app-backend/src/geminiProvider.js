import { GoogleGenAI } from "@google/genai";
class GeminiProvider {
    constructor(apiKey, modelId) {
        this.apiKey = apiKey;
        this.modelName = modelId;

        if(!this.apiKey || !this.modelName) {
            throw new Error("API key and Model ID must be provided");
        }
        this.genAI = new GoogleGenAI({apiKey: this.apiKey});
    }
    async generateResponse(prompt) {
        try{
            const response = await this.genAI.models.generateContent({
                model: this.modelName,
                contents: prompt,
            })
            return response.text || "No response generated";
        } catch (error) {
            console.error("Error generating response from Gemini API:", error?.stack || error);
            throw error;
        }
        //mock for local test
        // return `Mock reply for: ${prompt}`;
    }
    async generateEmbeddings(data, taskType = "RETRIEVAL_QUERY"){
        try{
            const response = await this.genAI.models.embedContent({
            model: 'gemini-embedding-001',
            contents: data,
            taskType
        });
        const embeddings = response.embeddings.map(e => e.values);
        return embeddings;
        }catch(error){
            console.error("Error generating embeddings from Gemini API:", error?.stack || error);
            throw new Error("Failed to generate embeddings");  
    }
}
}
export default GeminiProvider;