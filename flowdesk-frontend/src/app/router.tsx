import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '@/shared/components/layout/AppShell';
import { ProtectedRoute } from '@/shared/components/guards/ProtectedRoute';
import { ROUTES } from '@/constants/routes';

import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { RequestListPage } from '@/features/requests/pages/RequestListPage';
import { CreateRequestPage } from '@/features/requests/pages/CreateRequestPage';
import { RequestDetailPage } from '@/features/requests/pages/RequestDetailPage';
import { ApprovalListPage } from '@/features/approvals/pages/ApprovalListPage';
import { ApprovalDetailPage } from '@/features/approvals/pages/ApprovalDetailPage';
import { NotificationListPage } from '@/features/notifications/pages/NotificationListPage';
import { UserListPage } from '@/features/admin/pages/UserListPage';

const router = createBrowserRouter([
  /* ── Public ── */
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },

  /* ── Auth-gated app shell ── */
  {
    element: (
      <ProtectedRoute>
        <AppShell>
          {/* outlet rendered by children below */}
          <></>
        </AppShell>
      </ProtectedRoute>
    ),
    children: [],
  },

  /* ── Protected pages (individually wrapped) ── */
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Navigate to={ROUTES.DASHBOARD} replace />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <AppShell>
          <DashboardPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.REQUESTS,
    element: (
      <ProtectedRoute>
        <AppShell>
          <RequestListPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.REQUEST_CREATE,
    element: (
      <ProtectedRoute>
        <AppShell>
          <CreateRequestPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.REQUEST_DETAIL,
    element: (
      <ProtectedRoute>
        <AppShell>
          <RequestDetailPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.APPROVALS,
    element: (
      <ProtectedRoute>
        <AppShell>
          <ApprovalListPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.APPROVAL_DETAIL,
    element: (
      <ProtectedRoute>
        <AppShell>
          <ApprovalDetailPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTIFICATIONS,
    element: (
      <ProtectedRoute>
        <AppShell>
          <NotificationListPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_USERS,
    element: (
      <ProtectedRoute>
        <AppShell>
          <UserListPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },

  /* ── Fallback ── */
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
