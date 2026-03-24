# Jason Chat App (Frontend)

Angular frontend for the AI chat system. It provides the chat UI, sends user messages to backend APIs, and renders model responses in real time.

## Frontend Responsibilities

- Provide responsive chat interface for desktop/mobile
- Maintain client-side chat state (`history`, `loading`, `error`, `message`) with Angular Signals
- Submit user prompt to backend `POST /chat`
- Render user/bot message bubbles and typing feedback
- Show request/response errors to end users

## Tech Stack

- Angular 21 (standalone)
- TypeScript
- Tailwind CSS
- Bootstrap Icons
- RxJS + HttpClient

## How It Connects to Backend

The frontend calls:

- `POST {serverUrl}/chat`

`serverUrl` is configured in Angular environment files:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Expected backend response shape:

```json
{
	"reply": "model output text"
}
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Default local URL:

- `http://localhost:4200`

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Key Files

- `src/app/chat/chat.ts`: chat logic and state
- `src/app/chat/chat.html`: chat template
- `src/app/chat/chat.scss`: chat styles
- `src/app/services/chat/chat.service.ts`: API calls to backend
- `src/environments/environment.ts`: backend base URL config
