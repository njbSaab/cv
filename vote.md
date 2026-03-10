# VoteApp - Full-Stack Voting Application

## Overview

**VoteApp** is a full-stack voting/prediction platform built with a monorepo architecture containing:
- **Server**: NestJS backend with PostgreSQL and Redis
- **Client 1**: Vue 3 + Vite + TypeScript
- **Client 2**: React 19 + Vite + TypeScript

The application allows users to participate in sports/event predictions and voting.

---

## Project Structure

```
vote/
├── server-vote-nest/          # NestJS Backend
│   ├── src/
│   │   ├── auth/              # Authentication (JWT, email verification)
│   │   ├── users/             # User management
│   │   ├── events/            # Events & voting logic
│   │   ├── profile/           # User profile endpoints
│   │   ├── email/             # Email service (verification codes)
│   │   ├── websocket/         # WebSocket handlers
│   │   ├── database/          # TypeORM configuration
│   │   └── common/            # Shared utilities
│   ├── docker-compose.yml     # PostgreSQL + Redis
│   └── package.json
│
├── client-vote-vue/           # Vue 3 Client
│   ├── src/
│   │   ├── api/               # API client (axios)
│   │   ├── components/        # UI components
│   │   ├── composables/       # Vue composables
│   │   ├── layouts/           # Layout components
│   │   ├── pages/
│   │   │   ├── public/        # Public pages (Home, Vote, Login)
│   │   │   └── dashboard/     # Protected pages (Profile, Events)
│   │   ├── router/            # Vue Router configuration
│   │   ├── stores/            # Pinia stores (auth, user)
│   │   └── types/             # TypeScript types
│   └── package.json
│
└── vote-client-react/         # React 19 Client
    ├── src/
    │   ├── components/        # UI components
    │   ├── constants/         # API constants
    │   ├── hooks/             # Custom React hooks
    │   ├── lib/               # API client, utilities
    │   ├── pages/
    │   │   ├── public/        # Public pages
    │   │   ├── dashboard/     # Protected pages
    │   │   └── share/         # Shared pages
    │   ├── stores/            # Zustand stores (auth)
    │   ├── types/             # TypeScript types
    │   └── App.tsx
    └── package.json
```

---

## Tech Stack

### Backend (server-vote-nest)

| Technology | Purpose |
|------------|---------|
| **NestJS 11** | Backend framework |
| **TypeScript 5.7** | Language |
| **TypeORM 0.3** | ORM |
| **PostgreSQL 16** | Database |
| **Redis 7** | Cache & session storage |
| **JWT** | Authentication |
| **Socket.IO** | WebSockets |
| **Nodemailer** | Email service |
| **class-validator** | DTO validation |
| **passport** | Authentication strategy |

### Vue Client (client-vote-vue)

| Technology | Purpose |
|------------|---------|
| **Vue 3.5** | Framework |
| **Vite 6** | Build tool |
| **TypeScript 5.9** | Language |
| **Pinia 3** | State management |
| **Vue Router 4** | Routing |
| **Axios** | HTTP client |
| **TailwindCSS 3** | Styling |
| **DaisyUI 4** | UI components |
| **GSAP 3** | Animations |
| **unplugin-auto-import** | Auto imports |
| **unplugin-icons** | Icon system |

### React Client (vote-client-react)

| Technology | Purpose |
|------------|---------|
| **React 19** | Framework |
| **Vite 7** | Build tool |
| **TypeScript 5.9** | Language |
| **Zustand 5** | State management |
| **React Router 7** | Routing |
| **Axios** | HTTP client |
| **TailwindCSS 4** | Styling |
| **DaisyUI 5** | UI components |
| **GSAP 3** | Animations |
| **React Hot Toast** | Notifications |

---

## Database Schema

### Users Table
```typescript
{
  uuid: string (UUID, primary key)
  email: string (unique)
  name: string
  emailVerified: boolean
  points: number (default: 0)
  totalVotes: number (default: 0)
  correctPredictions: number (default: 0)
  browserInfo: JSON { userAgent, platform, language, timezone, screen, ip, referrer, fingerprint }
  isHistory: string (JSON history)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Events Table
```typescript
{
  id: number (primary key)
  typeEventId: string (unique)
  title: string
  sport: enum (football, basketball, tennis, esports, hockey, volleyball, box)
  participantA: string
  participantB: string
  logoA?: string
  logoB?: string
  eventStartsAt: timestamp
  votingEndsAt: timestamp
  result?: enum (1=A, 2=B, 3=Draw)
  totalVotes: number
  votesA: number
  votesB: number
  votesDraw: number
  isPublic: boolean
  isMainEvent: boolean
  status: enum (inactive, active, postponed, ended, cancelled)
  imageBgDesktop?: string
  imageBgMobile?: string
  grandPrize?: string
  forEveryPrize?: string
  subSportTitle?: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### UserVotes Table
```typescript
{
  id: number
  userId: string (FK → users.uuid)
  eventId: number (FK → events.id)
  choice: enum (1=A, 2=B, 3=Draw)
  createdAt: timestamp
}
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/send-code` | Send verification code to email | No |
| POST | `/auth/verify-code` | Verify code and login | No |
| POST | `/auth/logout` | Logout user | Yes |

### Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile/me` | Get current user | Yes |
| PATCH | `/profile/me` | Update profile | Yes |

### Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/events/main` | Get main event | No |
| GET | `/events/carousel` | Get carousel events | No |
| GET | `/events` | Get public events | No |
| GET | `/events/:typeEventId` | Get single event | No |
| GET | `/events/me` | Get user's events | Yes |
| GET | `/events/me/:typeEventId` | Get user's event | Yes |
| GET | `/events/dashboard` | Get dashboard data | Yes |
| POST | `/events/:typeEventId/vote` | Submit vote | Yes |

---

## Authentication Flow

1. **Registration/Login** (passwordless):
   - User enters email and name
   - Server sends 6-digit verification code to email
   - Code stored in Redis with 10min TTL
   - User enters code
   - Server verifies code, creates/updates user
   - JWT token returned (30 days expiry)
   - Token stored in HTTP-only cookie

2. **Session Restoration**:
   - On app load, client calls `/profile/me`
   - Server validates JWT from cookie
   - Returns user data or 401

3. **Logout**:
   - Client calls `/auth/logout`
   - Server clears cookie
   - Client clears local state

---

## Development Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

### 1. Start Database Services

```bash
cd server-vote-nest
docker-compose up -d
```

This starts:
- PostgreSQL on port `3317`
- Redis on port `6380`

### 2. Backend Setup

```bash
cd server-vote-nest
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# DATABASE_URL=postgresql://betvoice:123@localhost:3317/betvoice
# REDIS_URL=redis://localhost:6380
# JWT_SECRET=your-secret
# EMAIL_HOST=smtp.example.com
# EMAIL_PORT=587
# EMAIL_USER=user@example.com
# EMAIL_PASS=password

# Run migrations (if any)
npm run typeorm migration:run

# Start development server
npm run start:dev
```

Server runs on: `http://localhost:4700`

### 3. Vue Client Setup

```bash
cd client-vote-vue
npm install

# Start development server
npm run dev
```

Client runs on: `http://localhost:3333`

### 4. React Client Setup

```bash
cd vote-client-react
npm install

# Start development server
npm run dev
```

Client runs on: `http://localhost:5173`

---

## Scripts

### Backend

```bash
npm run start          # Start server
npm run start:dev      # Development mode with watch
npm run start:debug    # Debug mode
npm run start:prod     # Production mode
npm run build          # Build for production
npm run lint           # Run ESLint
npm run format         # Run Prettier
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run test:cov       # Run tests with coverage
```

### Vue Client

```bash
npm run dev            # Development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
npm run typecheck      # Run TypeScript check
```

### React Client

```bash
npm run dev            # Development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## Key Features

### Authentication
- ✅ Passwordless authentication via email
- ✅ 6-digit verification codes
- ✅ JWT tokens (30 days)
- ✅ HTTP-only cookies
- ✅ Session restoration
- ✅ Browser fingerprinting support

### Events & Voting
- ✅ Multiple sport types (Football, Basketball, Tennis, Esports, Hockey, Volleyball, Box)
- ✅ Public and private events
- ✅ Real-time vote counting
- ✅ Vote history tracking
- ✅ Event status management (Inactive, Active, Postponed, Ended, Cancelled)
- ✅ Main event selection

### User Dashboard
- ✅ Profile management
- ✅ Vote history
- ✅ Statistics (points, total votes, correct predictions)
- ✅ Event categories
- ✅ Personal event tracking

### UI/UX
- ✅ Responsive design (mobile + desktop)
- ✅ GSAP animations
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Dark mode support (DaisyUI)

---

## Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://betvoice:123@localhost:3317/betvoice

# Redis
REDIS_URL=redis://localhost:6380

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=30d

# Email (SMTP)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@example.com

# CORS
ALLOWED_ORIGINS=http://localhost:3333,http://localhost:5173,https://votevibe.netlify.app

# Server
PORT=4700
NODE_ENV=development
```

### Frontend (optional .env)

```env
# Vue Client
VITE_API_URL=http://localhost:4700

# React Client
VITE_API_URL=http://localhost:4700
```

---

## Deployment

### Backend

```bash
# Build
npm run build

# Start production server
npm run start:prod
```

### Vue Client

```bash
# Build
npm run build

# Output: dist/
# Deploy to Netlify, Vercel, or any static host
```

### React Client

```bash
# Build
npm run build

# Output: dist/
# Deploy to Netlify, Vercel, or any static host
```

---

## Testing

### Backend Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## Common Issues & Solutions

### CORS Issues
Ensure backend CORS configuration includes your frontend URL:
```typescript
// server-vote-nest/src/main.ts
app.enableCors({
  origin: ['http://localhost:3333', 'http://localhost:5173'],
  credentials: true,
});
```

### Database Connection
Verify PostgreSQL is running:
```bash
docker ps
docker logs pg-betvoice
```

### Redis Connection
Verify Redis is running:
```bash
docker ps
docker logs redis-betvoice
```

### Cookie Issues
Ensure `withCredentials: true` in axios config and `SameSite=Strict` on cookies.

---

## License

UNLICENSED

---

## Support

For questions and support, contact the project maintainers.
🇺🇦 🇬🇧 