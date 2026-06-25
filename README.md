# FlowDesk

FlowDesk is a full-stack application built to manage request and approval workflows. The project consists of two main parts:

- `flowdesk-backend`
- `flowdesk-frontend`

In local development:
- PostgreSQL runs with Docker Compose
- The backend runs locally with `npm run dev`
- The frontend runs locally with `npm run dev`

---

## Project Structure

```text
.
├── flowdesk-backend/
├── flowdesk-frontend/
└── compose.yaml
```

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- Argon2 or bcrypt
- Swagger / OpenAPI
- Vitest or Jest
- Supertest
- Docker
- Docker Compose

### Frontend
- React
- TypeScript
- Vite
- React Router v6
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- Headless UI
- Vitest
- React Testing Library
- Playwright
- MSW

---

## Requirements

Make sure these are installed on your machine:

- Node.js 20+
- npm 10+
- Docker
- Docker Compose

---

## Local Development

### 1. Start PostgreSQL

From the root directory:

```bash
docker compose up -d postgres
```

PostgreSQL runs with the following settings:

- Host: `localhost`
- Port: `5432`
- Database: `flowdesk`
- User: `flowdesk`
- Password: `flowdesk_dev_password`

### 2. Start the backend

```bash
cd flowdesk-backend
npm install
npm run dev
```

The backend runs by default at `http://localhost:3000`.

### 3. Start the frontend

Open a new terminal:

```bash
cd flowdesk-frontend
npm install
npm run dev
```

The frontend runs on the Vite dev server, usually at `http://localhost:5173`.

---

## Environment Files

### Backend

Create `flowdesk-backend/.env` from `.env.example`.

Example:

```env
PORT=3000
DATABASE_URL=postgresql://flowdesk:flowdesk_dev_password@localhost:5432/flowdesk?schema=public

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Frontend

Create `flowdesk-frontend/.env` from `.env.example`.

Example:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_MSW=true
```

---

## Docker Compose

At this stage, Docker Compose is used only for PostgreSQL.

Active service in `compose.yaml`:

- `postgres`

To start it:

```bash
docker compose up -d postgres
```

To stop it:

```bash
docker compose down
```

To remove volumes as well:

```bash
docker compose down -v
```

---

## Database

The backend uses Prisma.

Common commands:

```bash
cd flowdesk-backend
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

---

## Testing

### Backend tests

```bash
cd flowdesk-backend
npm run test
```

### Frontend unit/integration tests

```bash
cd flowdesk-frontend
npm run test
```

### Frontend e2e tests

```bash
cd flowdesk-frontend
npx playwright install
npm run e2e
```

---

## Production Note

At the current stage of development:
- the backend and frontend run locally
- PostgreSQL runs in Docker

At deployment time:
- the backend can be containerized
- the frontend can be built and served with nginx
- an `/api` proxy setup can be added for the frontend

This setup is intentionally kept simple for now.

---

## Git

Dependency folders and environment files should not be committed:

- `node_modules`
- `.env`
- `dist`
- `coverage`

The root `.gitignore` is configured accordingly.

---

## Quick Start Commands

Root:

```bash
docker compose up -d postgres
```

Backend:

```bash
cd flowdesk-backend
npm install
npm run dev
```

Frontend:

```bash
cd flowdesk-frontend
npm install
npm run dev
```

---

## Roadmap

- Authentication and authorization
- Request creation and listing
- Approval workflows
- Comments
- Notifications
- Admin panel
- Swagger / OpenAPI documentation
- CI/CD and production deployment
