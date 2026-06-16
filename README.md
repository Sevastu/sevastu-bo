# Sevastu Back Office

Next.js admin/staff dashboard for operating the Sevastu marketplace. The back office connects to `Sevastu-be` and covers dashboard metrics, catalog management, jobs, leads, customers, workers, worker verification, analytics, performance views, and settings.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Axios REST client
- route protection through `src/proxy.ts`
- shadcn-style UI primitives plus local dashboard components

## Documentation

| Doc | Contents |
| --- | --- |
| [BACKOFFICE_SUMMARY.md](./BACKOFFICE_SUMMARY.md) | Product and technical summary |
| [docs/OVERVIEW.md](./docs/OVERVIEW.md) | Routes, auth model, project structure |
| [docs/API-INTEGRATION.md](./docs/API-INTEGRATION.md) | Backend endpoints used by the UI |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Env vars, build, deploy checklist |

## Quick Start

```bash
cd Sevastu-bo
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Configuration

Set these in `.env` or the deployment environment:

```bash
NEXT_PUBLIC_API_URL=https://sevastu-be.onrender.com
NEXT_PUBLIC_API_TIMEOUT_MS=60000
```

`NEXT_PUBLIC_API_URL` should be the full backend origin with no trailing slash. The current code fallback is `https://sevastu-be.onrender.com`; set the variable explicitly for local backends, tunnels, staging, or production.

## Scripts

```bash
npm run dev      # local Next dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```
