# Sevastu Back Office - Overview

**Package:** `sevastu-fe`  
**Location:** `Sevastu-bo/`  
**Role:** Admin/staff dashboard for `Sevastu-be`.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Axios
- Lucide React
- Sonner
- shadcn-style UI primitives in `src/components/ui`

## App Routes

| Route | Purpose |
| --- | --- |
| `/` | Entry route |
| `/api/placeholder` | Local SVG placeholder image route |
| `/login` | Admin/staff login |
| `/dashboard` | KPI dashboard |
| `/analytics` | Analytics view |
| `/performance` | Performance/worker metrics view |
| `/jobs` | Jobs list and admin actions |
| `/leads` | Leads list and status management |
| `/users` | User list |
| `/customers` | Customer list backed by user admin API |
| `/workers` | Worker list and worker detail drawer |
| `/worker-verification` | Worker verification workflow |
| `/categories` | Category management |
| `/services` | Service management |
| `/sub-services` | Sub-service management |
| `/catalog` | Catalog overview/management |
| `/settings` | Settings and theme UI |

`src/components/layout/AppLayout.tsx` provides the protected shell, role-aware nav, theme toggle, notifications, and logout.
`src/proxy.ts` protects app routes using the auth cookie and excludes API/static/image/favicon paths.

## Auth Model

- Token key: `sevastu_access_token`.
- User key: `sevastu_user`.
- Token is stored in `localStorage`.
- Token is also duplicated into a `SameSite=Strict` cookie for middleware/protected route use.
- `apiClient` attaches `Authorization: Bearer <token>` on client requests.
- 401 responses clear local auth and redirect to `/login`.

## Source Layout

```text
src/
  app/           Next.js app routes and route-local components
  assets/        Logo/image assets
  components/    Layout, tables, charts, reusable UI
  features/      Per-domain API modules and hooks
  lib/           API client, auth helpers, enums, theme, utilities
  pages/         Legacy Pages Router directory if present
  proxy.ts       Cookie-based route protection
  styles/        Shared styles
```

## Feature Areas

- `features/auth` handles admin login.
- `features/dashboard` calls dashboard stats/analytics/performance APIs.
- `features/jobs` reads jobs and best-worker suggestions.
- `features/leads` reads and updates leads.
- `features/users` reads and updates users.
- `features/customers` maps customer UI onto `/admin/users`.
- `features/workers` reads workers, approves/rejects, and gets signed document URLs.
- `features/services` handles category/service/sub-service CRUD APIs.
- `features/services` also exposes admin catalog tree, overview, stats, search, reorder, cascade status, and upload helpers.
- `features/catalog` builds local tree state over service/admin-catalog APIs.

## Route-Local Components

- `app/jobs/components` contains job assignment, detail sheet, and timeline UI.
- `app/customers/components` contains customer profile and status display UI.
- `app/workers/components` contains worker details and review sheet UI.

## Related Docs

- [API-INTEGRATION.md](./API-INTEGRATION.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
