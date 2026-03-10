export const CASES = [
  /* ─────────────────────────────────────────────────────────
     CASE 01 — Quiz Platform + Email Chain Microservices
     Source: quiz-case.md (CQRS / DDD / GRASP architecture)
  ───────────────────────────────────────────────────────── */
  {
    id: 'c1',
    num: '01',
    title: 'Quiz Platform — CQRS + DDD Architecture',
    stack: 'Angular 15 · Angular Admin · NestJS CQRS/DDD · Prisma · PostgreSQL · BullMQ · Brevo · Ubuntu VPS',
    bullets: [
      'Angular SPA + Admin Panel — quiz CRUD, image upload, user table, email template editor',
      'NestJS backend: CQRS (QueryService / CommandService / Orchestrator) + DDD Domain Models',
      'Email chain microservice: BullMQ delayed sequences D+1 / D+3 / D+7, multi-provider fallback',
      'Ubuntu VPS: Nginx reverse proxy, PM2, SSL / HTTPS, production deploy from scratch',
    ],
    detail: {
      role: 'Fullstack (solo)',
      duration: '3 months',
      description:
        'Full online quiz platform with automated email funnel. Two independent NestJS microservices, Angular SPA + Angular Admin Panel. Backend built on Clean Architecture with CQRS pattern and DDD Domain Models containing all business logic.',
      sections: [
        {
          icon: '🎯',
          label: 'Client SPA (Angular + OOP FSD)',
          items: [
            'Quiz flow: dynamic questions, progress bar, countdown timer, instant feedback',
            'Email verification: enter address → receive OTP → validate → create session',
            'Results page: custom result screen with score details + auto-send to email',
            'Static content pages (About, Contacts) — content managed via Admin API',
            'PWA: service worker, offline support, installable app, push-ready manifest',
          ],
        },
        {
          icon: '⚙️',
          label: 'Admin Panel (Angular)',
          items: [
            'Quiz CRUD: create, edit, publish / unpublish with live preview',
            'Drag-and-drop question editor with image attachment support',
            'Image upload to own server via NestJS Multer — no 3rd party storage',
            'User table: search, filter, sort, per-user activity details',
            'Email template editor: edit default letter and drip chain templates',
          ],
        },
        {
          icon: '🏛️',
          label: 'Backend Architecture (NestJS · CQRS · DDD)',
          items: [
            'CQRS: QuizzesQueryService (SELECT only) + QuizzesCommandService (INSERT/UPDATE/DELETE) + Orchestrator Service',
            'DDD Domain Models: business rules inside model classes — QuizModel.toggleActive(), QuizModel.canShowOnMain()',
            'GRASP principles: Information Expert (model owns its data), Creator (factory methods), Pure Fabrication (Mapper, Cache)',
            'Layered Architecture: Presentation → Application → Domain → Infrastructure (Prisma ORM)',
            'DI via NestJS IoC container — all dependencies injected through constructors, easy to mock in tests',
          ],
        },
        {
          icon: '📧',
          label: 'Email Chain Microservice (NestJS)',
          items: [
            'Separate NestJS server isolating email logic from the main API',
            'Drip campaigns: configurable delay between each letter (D+1, D+3, D+7)',
            'BullMQ + Cron jobs for reliable queue with automatic retry on failure',
            'Multi-provider: Brevo primary SMTP + fallback SMTP server',
            'Status logging: delivered / opened / bounced via Brevo webhooks',
          ],
        },
        {
          icon: '🚀',
          label: 'Infrastructure & Deploy (Ubuntu VPS)',
          items: [
            'Nginx reverse proxy: multiple domains, SSL termination, static file serving',
            'PM2 process manager: auto-restart, log rotation, cluster mode',
            'Let\'s Encrypt SSL: automated certificate renewal via certbot',
            'Environment separation: .env per service, secrets outside git',
            'Zero-downtime deploy: pm2 reload with pre-deploy health check',
          ],
        },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     CASE 02 — VoteApp: Sports Prediction Platform
     Source: vote.md (monorepo Vue 3 + React 19 + NestJS)
  ───────────────────────────────────────────────────────── */
  {
    id: 'c2',
    num: '02',
    title: 'VoteApp — Sports Prediction Platform',
    stack: 'Vue 3 · React 19 · NestJS 11 · PostgreSQL 16 · Redis 7 · Socket.IO · TypeORM · JWT · Docker',
    bullets: [
      'Monorepo: Vue 3 client + React 19 client sharing one NestJS 11 backend',
      'Passwordless email auth: 6-digit OTP → JWT in HTTP-only cookie (30 days)',
      'Real-time vote counting via WebSocket (Socket.IO), 7 sport types',
      'User dashboard: points, correct predictions, vote history, personal event tracking',
    ],
    detail: {
      role: 'Fullstack (solo)',
      duration: '2 months',
      description:
        'Full-stack sports prediction platform with two independent frontend clients (Vue 3 + React 19) sharing one NestJS backend. Passwordless authentication via email OTP. Real-time vote updates via WebSocket. Redis for OTP storage and session caching.',
      sections: [
        {
          icon: '🔐',
          label: 'Authentication System (Passwordless)',
          items: [
            'User enters email + name → server sends 6-digit OTP via Nodemailer SMTP',
            'OTP stored in Redis with 10-minute TTL — auto-expires, no DB pollution',
            'On verify: code matched → JWT created (30 days) → stored in HTTP-only cookie',
            'Session restore on app load: GET /profile/me validates JWT from cookie',
            'Browser fingerprinting: userAgent, platform, timezone, screen, IP, referrer stored per user',
          ],
        },
        {
          icon: '🟢',
          label: 'Vue 3 Client (Pinia · Vue Router · GSAP)',
          items: [
            'Pinia stores for auth and user state — reactive, composable, TypeScript typed',
            'Vue composables for shared logic (useVote, useEvents, useAuth)',
            'Tailwind CSS 3 + DaisyUI 4 — component-driven responsive design',
            'GSAP animations for event cards, vote transitions, result reveals',
            'unplugin-auto-import + unplugin-icons for zero-boilerplate DX',
          ],
        },
        {
          icon: '⚛️',
          label: 'React 19 Client (Zustand · React Router 7)',
          items: [
            'React 19 with new hooks and concurrent features',
            'Zustand 5 for auth store — minimal, no boilerplate, persisted session',
            'React Router 7 for SPA routing — public + protected dashboard routes',
            'Tailwind CSS 4 + DaisyUI 5 — same design language as Vue client',
            'React Hot Toast for notifications, GSAP for animations',
          ],
        },
        {
          icon: '⚙️',
          label: 'NestJS 11 API + WebSocket',
          items: [
            'TypeORM 0.3 + PostgreSQL: Users, Events, UserVotes entities with relations',
            'Events: 7 sport types (Football, Basketball, Tennis, Esports, Hockey, Volleyball, Box)',
            'Vote endpoint: validates user auth → prevents double-vote → updates counters atomically',
            'Socket.IO real-time broadcast on vote submit — all clients get live vote counts',
            'Role-based access via Guards: public event views + protected vote/profile endpoints',
          ],
        },
        {
          icon: '🗄️',
          label: 'Data Model & Infrastructure',
          items: [
            'PostgreSQL 16: Users (uuid PK), Events (typeEventId unique), UserVotes (FK relations)',
            'Events schema: status enum (inactive/active/postponed/ended/cancelled), grand prizes, vote counters',
            'Redis 7 via Docker Compose: OTP storage with TTL, session caching',
            'Docker Compose: PostgreSQL on :3317 + Redis on :6380 — single command dev setup',
            'CORS: credentials:true + SameSite cookies for cross-origin auth from both clients',
          ],
        },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     CASE 03 — Telegram Bot + Angular Admin Panel (iGaming)
     Source: bot documentation (NestJS + Angular 18)
  ───────────────────────────────────────────────────────── */
  {
    id: 'c3',
    num: '03',
    title: 'Telegram Bot + Angular 18 Admin Panel',
    stack: 'NestJS · Telegraf.js · Angular 18 · MySQL · TypeORM · Tailwind CSS · DaisyUI · Docker · Nginx',
    bullets: [
      'Telegram bot: hierarchical menus, OTP email verification, push notifications, voting',
      'Angular 18 Admin: bot content + email marketing + events & landings + quiz system',
      'Multi-region deployment: VN · KR · JP · VI (4 geo markets)',
      'Docker + Nginx production deploy, Lazy Loading, AuthGuard, Feature-Sliced Design',
    ],
    detail: {
      role: 'Fullstack (team 2 people)',
      duration: '4 months (ongoing)',
      description:
        'Full ecosystem: NestJS Telegram bot with multi-level menus and email verification, and a feature-rich Angular 18 admin panel covering bot content management, email marketing, dynamic event landings, quiz system, and push notifications. Deployed across 4 regional domains.',
      sections: [
        {
          icon: '🤖',
          label: 'Telegram Bot (NestJS + Telegraf.js)',
          items: [
            'Hierarchical menus: tree structure (main menu → submenu → post) — fully DB-driven',
            'Personalized greetings with variable interpolation ([Name]) and image attachments',
            'Sports news subscription: user selects categories → receives targeted news',
            'OTP email verification: bot requests email → sends code → validates → activates subscription',
            'User segmentation: groups based on quiz/test completion — for targeted push campaigns',
          ],
        },
        {
          icon: '🎛️',
          label: 'Angular 18 Admin Panel — Bot Management',
          items: [
            'GreetingBot editor: welcome message text, images, variable placeholders',
            'Menu builder: MainButtonsMenu, MenuButtons, InlineButtons — full CRUD with ordering',
            'Posts manager: create/edit bot posts with text, images, scheduled publish',
            'News categories: hierarchical structure, create/edit/delete',
            'Push notifications: broadcast to all users or segmented groups with preview',
          ],
        },
        {
          icon: '📧',
          label: 'Email Marketing Module',
          items: [
            'Campaign composer: choose recipients (bot users / site users / manual list / segments)',
            'Email template editor: plain text + built-in templates + full style/content editor',
            'SendMode tabs: instant send / delayed send / scheduled by date-time',
            'Campaign history: table with date, status, recipient count, per-email details',
            'User filtering: filter by source (site registration form), date range, user group',
          ],
        },
        {
          icon: '🏟️',
          label: 'Events & Dynamic Landings',
          items: [
            'Event CRUD: title, description, dates, voting options, prizes, background images',
            'CountdownTimer component: real-time countdown to event start/end on the landing',
            'Email + push blast for event announcements: EventEmailPushComponent',
            'Event statistics: participant count, vote distribution, registration analytics',
            'Quiz module inside admin: create quizzes, chain email editor, preview, view results',
          ],
        },
        {
          icon: '🚀',
          label: 'Architecture & Infrastructure',
          items: [
            'Angular 18: Lazy-loaded AdminModule, AuthGuard on all /admin routes, Shared Module',
            'Feature-Sliced Design: entities / features / widgets / pages / shared layers',
            'Multi-region: VN (vietget.online), KR (1xarea.com), JP (1xjet.jp), VI (1xjap.com)',
            'Docker: Nginx:alpine container, dist served as static, ports 80/443 exposed',
            'Environment config: apiUrl, baseUrl, geo, secret per region via environment.ts',
          ],
        },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     CASE 04 — Betting / Casino Landings + Orchestrator
  ───────────────────────────────────────────────────────── */
  {
    id: 'c4',
    num: '04',
    title: 'Betting / Casino Landings + Registration Orchestrator',
    stack: 'NestJS Orchestrator · Node Verification · Provider API · FingerprintJS · Admin Panel',
    bullets: [
      'Seamless registration → deep-link redirect to provider event / slot',
      'Orchestrator coordinates 3 microservices: verifier → registrar → collector',
      'FingerprintJS Pro fraud detection + blacklist check + geo restrictions',
      'Admin: registrations dashboard, conversion funnel, email campaigns',
    ],
    detail: {
      role: 'Fullstack (team 3 people)',
      duration: 'Ongoing',
      description:
        'High-load landing system with fully seamless registration and deep-link redirect via provider API. NestJS orchestrator coordinates three microservices with retry logic, exponential backoff, and failover queuing.',
      sections: [
        {
          icon: '🎯',
          label: 'Landing Pages',
          items: [
            'Responsive landings for betting, slots, casino ads — pixel-perfect from design',
            'A/B variants for different ad campaigns and geo markets',
            'Lazy loading, minimal JS bundle for maximum performance (Core Web Vitals)',
            'UTM parameter tracking and conversion pixel for attribution',
          ],
        },
        {
          icon: '🔀',
          label: 'Orchestrator Server (NestJS)',
          items: [
            'Central entry point: receives registration from landing, coordinates 3 microservices',
            'Retry logic with exponential backoff for external API calls',
            'Per-step logging with correlation ID for full registration flow traceability',
            'Failover: if provider API unavailable → save to BullMQ queue for retry',
          ],
        },
        {
          icon: '✅',
          label: 'Verification Microservice',
          items: [
            'Email OTP: code generation, SMTP delivery, validation with rate limiting',
            'Duplicate check: email/phone against internal database',
            'FingerprintJS Pro: device fingerprint for fraud detection and duplicate prevention',
            'Blacklist check: blocked emails, IP ranges, geo restrictions',
          ],
        },
        {
          icon: '🏢',
          label: 'Provider Registration',
          items: [
            'Integration with REST API of major betting provider',
            'User registration with UTM/affiliate parameter forwarding',
            'Deep-link retrieval to specific event/slot after successful registration',
            'Internal user model ↔ provider schema mapping via dedicated mapper',
          ],
        },
        {
          icon: '📊',
          label: 'Admin Panel',
          items: [
            'Dashboard: daily registrations, landing conversion rate, failed attempts chart',
            'User table: filter by source, geo, registration status, date range',
            'Fingerprint reports: suspicious patterns, blocked attempt logs',
            'Email campaigns: bulk sends to registered user base with segmentation',
          ],
        },
      ],
    },
  },
]
