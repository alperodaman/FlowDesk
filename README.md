# FlowDesk

FlowDesk, onay ve talep süreçlerini yönetmek için geliştirilen full-stack bir uygulamadır. Proje iki ana bölümden oluşur:

- `flowdesk-backend`
- `flowdesk-frontend`

Local development aşamasında:
- PostgreSQL, Docker Compose ile çalışır
- Backend, lokal olarak `npm run dev` ile çalışır
- Frontend, lokal olarak `npm run dev` ile çalışır

---

<!-- ## Proje Yapısı

```text
.
├── flowdesk-backend/
├── flowdesk-frontend/
└── compose.yaml
```

--- -->

## Teknolojiler

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- Argon2 veya bcrypt
- Swagger / OpenAPI
- Vitest veya Jest
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

## Gereksinimler

Makinenizde şunların kurulu olması gerekir:

- Node.js 20+
- npm 10+
- Docker
- Docker Compose

---

## Local Development

### 1. PostgreSQL'i başlat

Root dizinde:

```bash
docker compose up -d postgres
```

PostgreSQL aşağıdaki ayarlarla çalışır:

- Host: `localhost`
- Port: `5432`
- Database: `flowdesk`
- User: `flowdesk`
- Password: `flowdesk_dev_password`

### 2. Backend'i çalıştır

```bash
cd flowdesk-backend
npm install
npm run dev
```

Backend varsayılan olarak `http://localhost:3000` üzerinde çalışır.

### 3. Frontend'i çalıştır

Yeni bir terminal aç:

```bash
cd flowdesk-frontend
npm install
npm run dev
```

Frontend varsayılan olarak Vite dev server üzerinde çalışır. Genelde `http://localhost:5173`.

---

## Environment Dosyaları

### Backend

`flowdesk-backend/.env` dosyasını `.env.example` üzerinden oluştur.

Örnek:

```env
PORT=3000
DATABASE_URL=postgresql://flowdesk:flowdesk_dev_password@localhost:5432/flowdesk?schema=public

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### Frontend

`flowdesk-frontend/.env` dosyasını `.env.example` üzerinden oluştur.

Örnek:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_MSW=true
```

---

## Docker Compose

Bu aşamada Docker Compose sadece PostgreSQL için kullanılır.

`compose.yaml` içindeki aktif servis:

- `postgres`

Başlatmak için:

```bash
docker compose up -d postgres
```

Durdurmak için:

```bash
docker compose down
```

Volume'ları da silmek için:

```bash
docker compose down -v
```

---

## Veritabanı

Backend Prisma kullanır.

Yaygın komutlar:

```bash
cd flowdesk-backend
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

---

## Test

### Backend testleri

```bash
cd flowdesk-backend
npm run test
```

### Frontend unit/integration testleri

```bash
cd flowdesk-frontend
npm run test
```

### Frontend e2e testleri

```bash
cd flowdesk-frontend
npx playwright install
npm run e2e
```

---

## Üretim Notu

Şu anda geliştirme sürecinde:
- backend ve frontend lokal çalıştırılır
- PostgreSQL Docker üzerinde çalışır

Deployment aşamasında:
- backend containerize edilebilir
- frontend build alınıp nginx ile servis edilebilir
- frontend için `/api` proxy yapısı eklenebilir

Bu yapı şimdilik bilerek sade tutulmuştur.

---

## Git

Bağımlılık klasörleri ve environment dosyaları Git'e eklenmez:

- `node_modules`
- `.env`
- `dist`
- `coverage`

Root `.gitignore` buna göre yapılandırılmıştır.

---

## Başlangıç Komut Özeti

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

<!-- ## Roadmap

- Kimlik doğrulama ve yetkilendirme
- Talep oluşturma ve listeleme
- Onay akışları
- Yorumlar
- Bildirimler
- Admin paneli
- Swagger / OpenAPI dökümantasyonu
- CI/CD ve production deployment -->
