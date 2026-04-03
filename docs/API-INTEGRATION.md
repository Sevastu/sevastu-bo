# Sevastu FE — API Integration

## Base URL

Configured in `src/lib/apiClient.ts`:

- `process.env.NEXT_PUBLIC_API_URL` **or** fallback `https://sevastu-be.onrender.com`

## HTTP client

- **File:** `src/lib/apiClient.ts`
- **Timeout:** 10s
- **Request:** attaches `Authorization: Bearer <token>` from `getToken()` (`lib/auth.ts`).
- **Response:** on **401**, calls `clearAuth()` and redirects to `/login`.

## Backend response shape

The API wraps payloads as:

```json
{ "success": true, "data": { ... }, "message": "..." }
```

List endpoints may return `data: { data: [...], pagination: {...} }` after the interceptor.

Feature code generally reads `res.data` (axios) and then `res.data.data` or nested fields as documented per module.

## Feature modules

### Login — `src/features/auth/api/login.ts`

- **POST** `/admin/auth/login` — body `{ email, password }`.
- Handles both wrapped and partially unwrapped responses when extracting `access_token` and `user`.
- Persists token + user via `setToken` / `setUser`.

### Dashboard — `src/features/dashboard/api.ts`

- **GET** `/admin/dashboard/stats`
- Maps `res.data.data` to `{ totalUsers, activeJobs, openLeads, revenue }`.

### Jobs — `src/features/jobs/api.ts`

- **GET** `/admin/jobs` — query `page`, `limit`, `search`
- **PATCH** `/admin/jobs/:id/status` — body `{ status }`; uses `res.data.data` for updated row

### Leads — `src/features/leads/api.ts`

- **GET** `/admin/leads` — query `page`, `limit`, `search`
- **PATCH** `/admin/leads/:id/status` — body `{ status }`

### Users — `src/features/users/api.ts`

- **GET** `/admin/users` — query `page`, `limit`, `search`
- **PATCH** `/admin/users/:id/status` — body `{ status }` (API allows **admin** role only)

## State management

No global store (Redux/Zustand). Auth and list UIs rely on **local component state** + **localStorage** for session.

## Related docs

- [OVERVIEW.md](./OVERVIEW.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
