import express from "express";
import GeminiProvider from "./geminiProvider.js";
import OpenAIProvider from "./openaiProvider.js";
import RagProvider from "./rag.js";
const router = express.Router();
router.post("/chat", async (req, res) => {
  const { message, model } = req.body;
  // message from frontend
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  console.log("Received message:", message);
  const modelName = model || "gemini";
  let llmProvider;
  try {
    if (modelName === "gpt") {
      llmProvider = new OpenAIProvider(
        process.env.OPENAI_API_KEY,
        process.env.OPENAI_MODEL_ID,
      );
    } else {
      llmProvider = new GeminiProvider(
        process.env.GEMINI_API_KEY,
        process.env.GEMINI_MODEL_ID,
      );
    }

    const queryEmbeddings = await llmProvider.generateEmbeddings(message);
    const queryVector = queryEmbeddings[0];

    const rag = new RagProvider();
    // const promt = rag.prepareSimpleRagPrompt(message);

    // Fetch FAQ vectors from faqs.json
    
    const faqData = rag.fetchDocumentData("faqs.json");
    let faqEmbeddings;
    if (llmProvider instanceof GeminiProvider) {
      faqEmbeddings = await llmProvider.generateEmbeddings(
        faqData.map((item) => item.answer),
        "RETRIEVAL_DOCUMENT",
      );
      console.log("(Gemini Provider)");
    } else {
      faqEmbeddings = await llmProvider.generateEmbeddings(
        faqData.map((item) => item.answer),
      );
      console.log("(OpenAI Provider)");
    }

    // enrich faq by adding embedding faq answer vectors
    const faqVectors = faqData.map((faq, index) => ({
      ...faq,
      vector: faqEmbeddings[index],
    }));
    const promt = rag.prepareRagPrompt(message, queryVector, faqVectors);
    console.log("Generated prompt:", promt);

    // const responseMessage = await llmProvider.generateResponse(message);
    const responseMessage = await llmProvider.generateResponse(promt);
    console.log("Generated response:", responseMessage);
    res.json({ reply: responseMessage });
  } catch (error) {
    console.error("Error generating response:", error?.stack || error);
    return res
      .status(500)
      .json({ error: "Failed to generate response from the AI" });
  }
});
export default router;
