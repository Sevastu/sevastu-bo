# Sevastu Back Office - Deployment

## Prerequisites

- Node.js 20+
- npm
- Running `Sevastu-be` API

## Environment

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Full backend origin with no trailing slash |
| `NEXT_PUBLIC_API_TIMEOUT_MS` | No | Axios timeout in ms; default 60000 |

Example:

```bash
NEXT_PUBLIC_API_URL=https://sevastu-be.onrender.com
NEXT_PUBLIC_API_TIMEOUT_MS=60000
```

Next.js inlines `NEXT_PUBLIC_*` values into the browser bundle, so set them at build/deploy time.

## Local Development

```bash
cd Sevastu-bo
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

Confirm backend `ALLOWED_ORIGINS` includes `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deploy Checklist

- Set `NEXT_PUBLIC_API_URL` explicitly; do not rely on the code fallback.
- Use HTTPS for production API traffic.
- Confirm admin login works against `/admin/auth/login`.
- Confirm protected routes redirect to `/login` after token removal or 401.
- Confirm `src/proxy.ts` cookie protection works after deployment.
- Verify signed document previews on worker verification pages.
- Verify catalog create/update/delete against the production backend.
- Verify catalog tree/stats/search/reorder/cascade APIs if using the enhanced catalog page.
- Verify catalog upload endpoint contract before enabling image upload in production.
- Run `npm run lint` before release.

## Related Docs

- [OVERVIEW.md](./OVERVIEW.md)
- [API-INTEGRATION.md](./API-INTEGRATION.md)
