# DrawXL 🎨

A real-time collaborative whiteboard application inspired by Excalidraw — draw, sketch, and collaborate with others live on a shared canvas.

## Overview

DrawXL lets multiple users draw on the same canvas in real time. Every stroke is broadcast instantly to all connected clients over WebSockets — similar to how messages work in a chat app — and persisted to the database so your drawings are never lost on refresh.

## Features

- 🖌️ Real-time freehand drawing synced across all connected users
- ⚡ Instant stroke broadcasting via WebSockets (low-latency, chat-like delivery)
- 💾 Persistent canvas — strokes are saved to the database and reloaded on join
- 🏗️ Monorepo architecture for clean separation of frontend, backend, and shared packages

## How It Works

1. User draws on the canvas — each stroke is captured as a data event.
2. The stroke is sent to the backend over a WebSocket connection (using the `ws` library).
3. The server broadcasts the stroke to all other clients connected to the same room/canvas, in real time — just like message delivery in a chat application.
4. In parallel, the stroke is saved to the database via Prisma.
5. When a new user joins, a GET request fetches all previously saved strokes from the database and renders them on their canvas, syncing them with the current state.

## Tech Stack

- **Monorepo:** Turborepo
- **Real-time communication:** WebSocket (`ws` library)
- **ORM / Database layer:** Prisma
- **Architecture:** Client renders canvas strokes → strokes pushed over WebSocket → server broadcasts to room + persists via Prisma → new clients fetch saved strokes via REST GET on load

## Project Structure

This project uses a Turborepo monorepo setup, separating concerns into apps and shared packages for scalability and maintainability.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Nitinref/DrawXL.git
cd DrawXL

# Install dependencies
npm install

# Run the dev environment
npm run dev
```

## Future Improvements

- Shape tools (rectangle, circle, arrow, text)
- Room-based access control
- Export canvas as image/PDF
- Undo/redo support

## License

MIT
