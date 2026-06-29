export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  DASHBOARD: '/dashboard',

  REQUESTS: '/requests',
  REQUEST_CREATE: '/requests/new',
  REQUEST_DETAIL: '/requests/:id',
  REQUEST_EDIT: '/requests/:id/edit',

  APPROVALS: '/approvals',
  APPROVAL_DETAIL: '/approvals/:id',

  NOTIFICATIONS: '/notifications',

  PROFILE: '/profile',

  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_REQUEST_TYPES: '/admin/request-types',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
} as const;

export type RouteKey = keyof typeof ROUTES;
