export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  JOBS: {
    LIST: '/jobs',
    DETAIL: (id: string) => `/jobs/${id}`,
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  WORKERS: {
    LIST: '/workers',
    DETAIL: (id: string) => `/workers/${id}`,
  },
} as const;
