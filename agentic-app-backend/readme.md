# Agentic App Backend

Agentic backend service built with Express + MCP + Gemini.
It supports tool-using conversations, Retrieval-Augmented Generation (RAG), and domain-specific operations (customers, orders, weather).

## What This Backend Provides

- Agentic chat endpoint that can reason and call tools
- MCP server and MCP client integration in the same app
- Tool catalog for customer, order, weather, and RAG retrieval
- RAG pipeline with document ingestion and vector search
- Switchable vector database backend: `chroma` or `pgvector`

## Core Features

1. Agentic Tool Calling
- Main endpoint: `POST /api/chat`
- Uses Gemini with MCP tool binding (`generateResponseWithTools`)
- The model can choose the right tool based on user intent

2. RAG (Retrieval-Augmented Generation)
- Ingest markdown/text documents from `src/data/rag_docs`
- Chunk documents and generate embeddings
- Store vectors in ChromaDB or PostgreSQL + pgvector
- Retrieve top-K relevant chunks and build a grounded prompt

3. Domain APIs + Tools
- Customer operations (list customers, fetch by ID)
- Order operations (list orders, list with customer details, fetch by ID)
- Live weather lookup via third-party weather API

## MCP Tool Catalog

- `getCustomers`: Fetch latest customers (optional limit)
- `getCustomerById`: Fetch a customer by ID
- `getOrders`: Fetch latest orders (optional limit)
- `getOrdersWithCustomerDetails`: Fetch orders enriched with customer names
- `getOrderById`: Fetch an order by ID
- `getWeatherData`: Fetch real-time weather by city/country
- `ragSearch`: Retrieve relevant chunks and return RAG-ready prompt + sources

## API Endpoints

- `GET /` - Health check
- `POST /api/chatWithLLM` - Basic LLM route
- `GET/POST /api/customers` - Customer routes
- `GET/POST /api/orders` - Order routes
- `GET /api/weather` - Weather route
- `POST /api/chat` - Agentic route with MCP tools
- `POST /mcp` - MCP server transport endpoint

## Example Flowchart

![RAG Pipeline Example](docs/flowchart.jpg)

## Demo Screenshots

### Multi-step reasoning in frontend demo
![Multi-step Reasoning Demo](docs/Mutli-step-reasoning.png)

### Customer question handled with customer tools
![Customer Tool Backend](docs/Customer%20Tool%20Backend.png)

### Refund policy query showing embedding/RAG behavior in backend
![RAG Backend](docs/RAG%20Backend.png)

### Real-time weather answer via external weather tool
![Weather Tool Backend](docs/Weather%20Tool%20Backends.png)

## Prerequisites

1. Runtime
- Node.js 20+ (Node 24 works)
- npm

2. Required API keys
- `GEMINI_API_KEY` (required)
- `WEATHER_API_KEY` (required if using weather tool)
- `OPENAI_API_KEY` is optional in current agent flow

3. Choose one vector database backend

Option A: ChromaDB (recommended for local quick setup)
- Install dependencies:

```bash
npm install
```

- Run Chroma locally:

```bash
npx chroma run --path src/vector-data
```

- In `.env`:

```dotenv
VECTOR_DB=chroma
CHROMA_HOST=localhost
CHROMA_PORT=8000
CHROMA_COLLECTION=rag_documents
```

Option B: PostgreSQL + pgvector
- Install and run PostgreSQL locally
- Install pgvector extension on the PostgreSQL host machine
- Create database and extension:

```sql
CREATE DATABASE rag_vector_db;
\c rag_vector_db
CREATE EXTENSION IF NOT EXISTS vector;
```

- In `.env`:

```dotenv
VECTOR_DB=pgvector
POSTGRES_URL=postgres://postgres:password@localhost:5432/rag_vector_db
PGVECTOR_TABLE=rag_vectors
EMBEDDING_DIMS=3072
```

Note: If you see `extension "vector" is not available`, pgvector is not installed on the same machine/container where PostgreSQL is running.

## Environment Setup

Create/update `.env` with at least:

```dotenv
GEMINI_API_KEY="YOUR_KEY"
GEMINI_MODEL="gemini-2.5-flash-lite"
PORT=3000

SERVER=http://localhost

WEATHER_API_KEY="YOUR_WEATHER_API_KEY"

VECTOR_DB=chroma
CHROMA_HOST=localhost
CHROMA_PORT=8000
CHROMA_SSL=false
CHROMA_COLLECTION=rag_documents

RAG_CHUNK_SIZE=800
RAG_CHUNK_OVERLAP=100
EMBEDDING_DIMS=3072
```

## Run Order (Important)

You should ingest documents before running agentic RAG queries.

1. Install dependencies

```bash
npm install
```

2. Start your selected vector DB backend
- Chroma: `npx chroma run --path src/vector-data`
- or PostgreSQL with pgvector enabled

3. Ingest docs first

```bash
npm run rag:ingest
```

4. Start backend

```bash
npm run dev
```

## Quick Test

```bash
curl -X POST http://localhost:3000/api/chat \
	-H "Content-Type: application/json" \
	-d '{"message":"How can I request a refund?"}'
```

## Project Structure (Key Files)

- `src/index.ts` - App bootstrap and route mounting
- `src/controllers/agent.controller.ts` - Agentic orchestration
- `src/mcp/server/mcpServer.ts` - MCP server creation and tool registration
- `src/mcp/server/tools/*.ts` - MCP tool definitions
- `src/rag/ingest.ts` - Document ingestion pipeline
- `src/rag/ragEngine.ts` - Retrieval + prompt composition engine
- `src/rag/vectorStore/dbs/chroma.db.ts` - Chroma backend
- `src/rag/vectorStore/dbs/pgvector.db.ts` - PostgreSQL/pgvector backend

## Troubleshooting

1. `extension "vector" is not available`
- Install pgvector on PostgreSQL host system
- Verify you are connected to the correct PostgreSQL instance

2. No RAG results returned
- Ensure docs were ingested using `npm run rag:ingest`
- Verify `VECTOR_DB` and backend connection env values

3. Weather tool fails
- Check `WEATHER_API_KEY`
- Verify outbound internet/network access