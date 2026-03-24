import OpenAI from "openai";

class OpenAIProvider {
    constructor(apiKey, modelName) {
        if(!apiKey || !modelName) {
            throw new Error("API key and Model ID must be provided");
        }
        this.apiKey = apiKey;
        this.modelName = modelName;
        this.openai = new OpenAI({apiKey: this.apiKey});
    }
    async generateResponse(prompt) {
        try{
            const response = await this.openai.responses.create({
                model: this.modelName,
                input: prompt,
            });
            return response.output_text || "No response generated";
        } catch (error) {
            console.error("Error generating response from OpenAI API:", error?.stack || error);
            throw error;
        }
    }

async generateEmbeddings(data){
    try{
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: data,
            encoding_format: "float",
        });
        const embeddings = response.data.map(e => e.embedding);
        return embeddings;
    }catch(error){
        console.error("Error generating embeddings from OpenAI API:", error?.stack || error);
        throw new Error("Failed to generate embeddings");  
    }
}
}
export default OpenAIProvider;