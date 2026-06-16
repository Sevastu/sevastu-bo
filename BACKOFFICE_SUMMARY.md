# Sevastu Back Office - System Summary

## Overview

`Sevastu-bo` is the Next.js admin/staff portal for operating the Sevastu marketplace. It connects to `Sevastu-be` and provides dashboards, catalog management, job oversight, lead/user/customer views, worker moderation, worker verification, analytics, performance reporting, and settings.

## Current Implementation

- Admin/staff login through `/admin/auth/login`.
- Token and user persistence in `localStorage`, with the access token mirrored to a cookie for route protection.
- `src/proxy.ts` redirects unauthenticated users to `/login` and redirects authenticated users away from `/login` to `/dashboard`.
- Shared protected shell in `AppLayout` with role-aware navigation.
- Dashboard stats, analytics, and worker-performance API helpers.
- Catalog management for categories, services, and sub-services.
- Enhanced catalog admin APIs for tree, overview, stats, search, centralized reorder, cascade active/inactive status, and image upload hooks.
- Job list/detail/status/cancel/reassign helpers plus best-worker suggestions.
- Leads list and status updates.
- Users and customers views backed by `/admin/users`; customer analytics currently returns local fallback data because the backend analytics endpoint is unavailable.
- Worker list/detail, worker verification, approve/reject, and signed private ID proof preview URLs.
- Route-local drawers/sheets for jobs, customers, workers, and verification workflows.
- Settings/theme UI with local theme persistence.
- Local SVG placeholder API route at `/api/placeholder`.

## Architecture

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16.2.1 App Router |
| Runtime UI | React 19.2.4 |
| Styling | Tailwind CSS 4, local theme CSS, shadcn-style primitives |
| Icons | Lucide React |
| API | Axios client in `src/lib/apiClient.ts` |
| Auth | `src/lib/auth.ts`, localStorage + cookie |
| Route protection | `src/proxy.ts` |
| Features | Domain API modules under `src/features` |

## Main Operator Journeys

1. Admin/staff logs in.
2. Dashboard shows marketplace and operational stats.
3. Operators inspect jobs, leads, users, customers, and workers.
4. Admin/staff review worker documents through short-lived signed URLs.
5. Admin approves/rejects workers, reassigns jobs, and updates user/job state where allowed.
6. Admin manages category, service, and sub-service catalog structure.

## Integration Notes

- `NEXT_PUBLIC_API_URL` is supported; current code fallback is `https://sevastu-be.onrender.com`.
- `NEXT_PUBLIC_API_TIMEOUT_MS` defaults to 60000ms.
- 401 responses call `clearAuth()` and redirect to `/login`.
- Catalog upload helper currently posts multipart data to `/upload`; verify backend auth/role expectations before using it for admin catalog assets.
- Customer analytics intentionally returns zero/fallback metrics instead of calling the unavailable `/admin/users/analytics`.
- Worker document previews depend on `/upload/private-url`.

## Planned / Pending Work

- Wire real customer analytics once the backend exposes it.
- Add verification audit viewer for compliance.
- Add safe OCR summary display when backend returns reviewer-safe fields.
- Normalize catalog image upload to the backend’s final admin asset endpoint.
- Add dispute/payment/payout pages when backend contracts exist.
- Keep staff/admin UI permissions aligned with backend role guards.

## More Detail

- [README.md](./README.md)
- [docs/OVERVIEW.md](./docs/OVERVIEW.md)
- [docs/API-INTEGRATION.md](./docs/API-INTEGRATION.md)
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
