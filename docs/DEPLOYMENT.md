# Sevastu FE — Deployment

## Prerequisites

- Node.js 20+ (aligned with `package.json` types)
- Access to a running **Sevastu-be** instance

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Full origin of the Nest API (e.g. `https://api.example.com`) — **no trailing slash** |
| `NEXT_PUBLIC_API_TIMEOUT_MS` | Optional. Axios timeout in ms (default **60000**). Raise if login still times out on very slow cold starts. |

If unset, the client defaults to the Render URL baked into `apiClient.ts`; override for every non-default environment.

## Install & build

```bash
cd Sevastu-bo
npm install
npm run build
npm start
```

## Development

```bash
npm run dev
```

Default Next dev server: `http://localhost:3000` (ensure `ALLOWED_ORIGINS` on the backend includes this origin).

## Production notes

- Set `NEXT_PUBLIC_API_URL` at **build time** (Next inlines public env vars into the client bundle).
- Use HTTPS in production; cookie `SameSite=Strict` is set in `setToken` — confirm cookie policy matches your domain model.
- After deploy, verify admin login and that 401 handling redirects to `/login`.

## Lint

```bash
npm run lint
```

## Related docs

- [OVERVIEW.md](./OVERVIEW.md)
- [API-INTEGRATION.md](./API-INTEGRATION.md)
