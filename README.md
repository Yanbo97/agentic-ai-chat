# AI_CHAT_APP

This is demo AI agentic APP designed by Jason Guan Technologies.

## Project Overview

This workspace currently includes:

- `chat-app-backend`: Initial RAG-based backend version
- `agentic-app-backend`: Advanced agentic backend with MCP tools + RAG
- `jason-chat-app`: Angular frontend application

## Folder Navigation

### 1. Initial Backend (RAG v1)
Path: `chat-app-backend`

Use this backend if you want a simpler, earlier RAG implementation.

Key highlights:

- Basic chat endpoint
- FAQ/document retrieval with embeddings
- Prompt enrichment using similarity-based context
- Supports Gemini/OpenAI provider routing

### 2. Agentic Backend (Current Advanced Version)
Path: `agentic-app-backend`

Use this backend for the full agentic workflow.

Key highlights:

- Agentic chat endpoint with tool calling
- MCP server + MCP client integration
- Built-in tools for customer/order/weather operations
- RAG ingestion and retrieval pipeline
- Switchable vector database backend (`chroma` or `pgvector`)

### 3. Frontend
Path: `jason-chat-app`

Angular-based chat UI connected to backend APIs.

Key highlights:

- Responsive chat interface
- Real-time request/response rendering
- Error/loading states
- Integrates with backend chat endpoints

## Recommended Starting Points

- For a quick baseline backend: start with `chat-app-backend`
- For production-style agentic capability: use `agentic-app-backend`
- For UI development and integration testing: use `jason-chat-app`

## Typical Local Workflow

1. Choose backend (`chat-app-backend` or `agentic-app-backend`)
2. Configure `.env` in the selected backend
3. For agentic RAG: run ingestion first (`npm run rag:ingest`)
4. Start backend service
5. Start frontend from `jason-chat-app`

## Author

Jason Guan  
Jason Guan Technologies

## Notice: Please use your own Gemini/openAI API KEY and Weather API Key to run the code!
