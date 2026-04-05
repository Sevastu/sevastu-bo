# Sevastu FE (Back Office) — Overview

**Package name:** `sevastu-fe`  
**Location:** `Sevastu-bo/` in the KaamSetu workspace  
**Role:** Admin/staff dashboard for the Sevastu marketplace API (`Sevastu-be`).

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Axios for REST
- UI: shadcn-style components (`components/ui/`), Lucide icons

## App routes

| Route | Purpose |
|-------|---------|
| `/` | Entry / landing |
| `/login` | Admin email + password → `POST /admin/auth/login` |
| `/dashboard` | KPIs from `GET /admin/dashboard/stats` |
| `/users` | Paginated `User` list; status updates (admin-only on API) |
| `/jobs` | Paginated jobs; status patches |
| `/leads` | Paginated leads; status patches |
| `/settings` | App settings UI |

Layouts: `app/layout.tsx`, `app/dashboard/layout.tsx`; shared chrome in `components/layout/AppLayout.tsx`.

## Auth model

- JWT stored in **`localStorage`** key `sevastu_access_token` and duplicated in a **cookie** (`sevastu_access_token`) for middleware-based protection.
- User profile JSON: `sevastu_user` (`lib/auth.ts`).
- Roles in token: `admin` | `staff` (from admin login payload).

## Project structure (high level)

```
src/
  app/           # Next.js pages
  components/    # Layout, DataTable, UI primitives
  features/      # Per-domain API modules (auth, dashboard, jobs, leads, users)
  lib/           # apiClient, auth helpers, theme, utils
```

## Related docs

- [API-INTEGRATION.md](./API-INTEGRATION.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
