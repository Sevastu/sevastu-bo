# Sevastu Back Office - API Integration

## Base URL

`src/lib/apiClient.ts` uses:

```ts
process.env.NEXT_PUBLIC_API_URL || "https://sevastu-be.onrender.com"
```

Set `NEXT_PUBLIC_API_URL` explicitly for local backends, tunnels, staging, or production overrides.

## HTTP Client

- File: `src/lib/apiClient.ts`
- Timeout: `Number(NEXT_PUBLIC_API_TIMEOUT_MS) || 60000`
- Sends JSON by default.
- Adds `Authorization: Bearer <token>` from `src/lib/auth.ts`.
- On 401, clears auth and redirects to `/login`.

## Response Envelope

Backend responses are generally wrapped:

```json
{ "success": true, "data": {}, "message": "Success" }
```

Some feature modules unwrap defensively because older endpoints or fallback UI code may return arrays or nested pagination differently.

## Auth - `src/features/auth/api/login.ts`

| Method | Endpoint | Body | Notes |
| --- | --- | --- | --- |
| POST | `/admin/auth/login` | `{ email, password }` | Stores `access_token` and `user` |

## Dashboard - `src/features/dashboard/api.ts`

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/admin/dashboard/stats` | Maps to total users, active jobs, open leads, revenue |
| GET | `/admin/dashboard/analytics` | Returns analytics data, with UI fallback on failure |
| GET | `/admin/dashboard/worker-performance` | Admin-only backend route |

## Jobs - `src/features/jobs/api.ts`

| Method | Endpoint | Body / query |
| --- | --- | --- |
| GET | `/admin/jobs` | Query filters such as page, limit, search |
| GET | `/admin/jobs/:id` | Job detail |
| PATCH | `/admin/jobs/:id/status` | `{ status, context? }`; used for update and cancel |
| GET | `/admin/jobs/:id/best-workers` | Suggested workers for a job |
| PATCH | `/admin/jobs/:id/reassign` | `{ workerId }` |

## Leads - `src/features/leads/api.ts`

| Method | Endpoint | Body / query |
| --- | --- | --- |
| GET | `/admin/leads` | `page`, `limit`, `search` |
| PATCH | `/admin/leads/:id/status` | `{ status }` |

## Users And Customers

`features/users`:

| Method | Endpoint | Body / query |
| --- | --- | --- |
| GET | `/admin/users` | `page`, `limit`, `search` |
| GET | `/admin/users/:id` | User/customer detail |
| PATCH | `/admin/users/:id/status` | `{ status }` |

`features/customers` also calls `/admin/users` with `role=customer`.

Current gap: customer analytics returns local fallback data because `/admin/users/analytics` is not implemented on the backend.

## Workers And Verification - `src/features/workers/api.ts`

| Method | Endpoint | Body / query |
| --- | --- | --- |
| GET | `/admin/worker/list` | Optional `status` |
| GET | `/admin/worker/:userId` | Worker details |
| POST | `/admin/worker/approve` | `{ userId }`; admin role required |
| POST | `/admin/worker/reject` | `{ userId, reason }`; admin role required |
| GET | `/upload/private-url` | `key`; signed ID proof URL |

Backend also exposes `POST /admin/worker/:id/trigger-ocr`.

## Catalog / Services - `src/features/services/api.ts`

| Method | Endpoint | Body / query |
| --- | --- | --- |
| GET | `/categories` | List categories |
| POST | `/categories` | Category create |
| PATCH | `/categories/:id` | Category update |
| DELETE | `/categories/:id` | Category delete |
| GET | `/services` | Optional `categoryId` |
| POST | `/services` | Service create |
| PATCH | `/services/:id` | Service update |
| DELETE | `/services/:id` | Service delete |
| GET | `/sub-services` | Optional `serviceId` |
| POST | `/sub-services` | Sub-service create |
| PATCH | `/sub-services/:id` | Sub-service update |
| DELETE | `/sub-services/:id` | Sub-service delete |
| GET | `/admin/catalog/tree` | Optimized hierarchy for catalog admin UI |
| GET | `/admin/catalog/overview` | Flat category/service/sub-service arrays |
| GET | `/admin/catalog/stats` | Catalog counts and active/inactive totals |
| GET | `/admin/catalog/search` | Query `q` |
| PATCH | `/admin/catalog/reorder` | `{ entityType, orderedIds }` |
| PATCH | `/admin/catalog/category/:id/cascade-status` | `{ isActive }` |
| PATCH | `/admin/catalog/service/:id/cascade-status` | `{ isActive }` |
| POST | `/upload` | Multipart catalog upload helper in current FE code |

Note: the backend also has `/admin/catalog/upload`; the current FE helper posts catalog files to `/upload`, so confirm the intended backend contract before relying on catalog image upload in production.

## Settings

`src/app/settings/page2.tsx` calls:

| Method | Endpoint | Body |
| --- | --- | --- |
| POST | `/auth/set-password` | `{ password }` |

## Local Placeholder API

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/placeholder` | Returns a generated SVG. Query supports `width` and `height`. |

## Related Docs

- [OVERVIEW.md](./OVERVIEW.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
