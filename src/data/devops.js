export const DEVOPS_ITEMS = [
  {
    icon: '🖥️',
    label: 'VPS/VDS Setup',
    detail:
      'Ubuntu 22.04 / Debian 12. Initial steps: package updates, non-root user creation, SSH key-only auth, root login disabled. Hostname, timezone, locale configuration. Base utilities: htop, curl, git, build-essential, nvm, Python 3.',
  },
  {
    icon: '🌐',
    label: 'Nginx / Apache',
    detail:
      'Nginx as reverse proxy for multiple Node services on different ports. Server blocks (virtual hosts) for multiple domains. Gzip compression, browser caching headers, rate limiting zones. SSL termination + HTTP→HTTPS redirect. Serve static Angular/React builds directly via Nginx.',
  },
  {
    icon: '🐳',
    label: 'Docker / Compose',
    detail:
      'Multi-stage Dockerfile for Node apps (builder → runner, distroless). Docker Compose stacks: NestJS + PostgreSQL + Redis + Nginx in one file. Named volumes for persistence. Health checks. .env files and secrets management.',
  },
  {
    icon: '⚡',
    label: 'PM2',
    detail:
      'Cluster mode for Node/NestJS — utilizing all CPU cores. Ecosystem file (pm2.config.js) to manage multiple services. Log rotation via pm2-logrotate. Auto-restart on crashes, startup scripts for auto-launch after reboot.',
  },
  {
    icon: '🔐',
    label: 'SSL / Security',
    detail:
      "Let's Encrypt via Certbot + automatic certificate renewal (cron). ufw firewall: only ports 22, 80, 443 open. fail2ban for brute-force SSH protection. Nginx: security headers (HSTS, X-Frame-Options, CSP).",
  },
  {
    icon: '☁️',
    label: 'Cloudflare',
    detail:
      'DNS management: A, CNAME, MX records. Proxy mode for DDoS protection and real IP masking. Workers: edge functions for A/B testing and geo-based routing. D1: serverless SQLite database at the edge. Pages: static hosting with git deploy.',
  },
  {
    icon: '🔄',
    label: 'CI/CD',
    detail:
      'GitHub Actions: workflow on push to main. Build SPA → run tests → build Docker image → push to registry → SSH deploy to server. Or: build Angular/React → rsync static files → pm2 reload API. Secrets stored in GitHub Secrets.',
  },
  {
    icon: '🗄️',
    label: 'Database Admin',
    detail:
      'PostgreSQL: pg_dump for backups, cron for automated backups to S3/Backblaze. EXPLAIN ANALYZE for slow query optimization. Indexes on frequently filtered fields. MySQL: same approach. Connection pooling via PgBouncer or Prisma.',
  },
]
