# Chat App Backend

Node.js + Express backend for the chat application. It handles model calls (Gemini/OpenAI), does lightweight RAG retrieval from local FAQ data, and returns final replies to the frontend.

## Backend Responsibilities

- Expose chat API endpoint (`POST /api/chat`)
- Validate user input (`message` is required)
- Route model provider by request (`gemini` by default, `gpt` optional)
- Generate embeddings for query and FAQ answers
- Rank FAQ context with cosine similarity
- Compose RAG prompt and request final model response

## Tech Stack

- Node.js (ESM)
- Express
- `@google/genai`
- `openai`
- `compute-cosine-similarity`

## API

### `POST /api/chat`

Request body:

```json
{
  "message": "How can I request a refund?",
  "model": "gemini"
}
```

- `message` (string, required)
- `model` (string, optional): `gemini` or `gpt`

Response:

```json
{
  "reply": "..."
}
```

## Environment Variables

Create `chat-app-backend/.env` and provide your own keys:

```dotenv
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
GEMINI_MODEL_ID="gemini-2.5-flash-lite"

OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
OPENAI_MODEL_ID="gpt-5-nano"

PORT=3000
```

Important notes:

- Clients must provide their own `GEMINI_API_KEY` and/or `OPENAI_API_KEY` in `chat-app-backend/.env`.
- Do not hardcode or share real keys in Git.
- Rotate keys immediately if they are accidentally exposed.

## Why Cosine Similarity?

This backend uses embeddings to find the most relevant FAQ answers before prompting the model.

Cosine similarity is used because:

- It measures angle-based semantic similarity, not raw magnitude.
- Embedding vector length may vary, but direction captures meaning better.
- It is efficient and widely used for nearest-neighbor style text retrieval.

In this project, cosine similarity ranks FAQ vectors and selects top matches (top 2) as context for the final answer.

## Run Locally

Install dependencies:

```bash
npm install
```

Run in watch mode:

```bash
npm run dev
```

Run normally:

```bash
npm start
```

Server default URL:

- `http://localhost:3000`

Health check:

- `GET /`

## Project Structure (Key Files)

- `server.js`: app bootstrap
- `src/chatRouter.js`: chat endpoint and orchestration
- `src/geminiProvider.js`: Gemini calls
- `src/openaiProvider.js`: OpenAI calls
- `src/rag.js`: FAQ loading + cosine ranking + RAG prompt
- `data/faqs.json`: FAQ knowledge source
