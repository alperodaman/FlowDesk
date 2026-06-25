import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '@/shared/components/layout/AppShell';
import { ProtectedRoute } from '@/shared/components/guards/ProtectedRoute';
import { ROUTES } from '@/constants/routes';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RequestListPage } from '@/features/requests/pages/RequestListPage';
import { CreateRequestPage } from '@/features/requests/pages/CreateRequestPage';
import { RequestDetailPage } from '@/features/requests/pages/RequestDetailPage';

function HomePage() {
  return <div className="text-lg font-medium">Flow Desk dashboard</div>;
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <AppShell>
        <HomePage />
      </AppShell>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <AppShell>
        <LoginPage />
      </AppShell>
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
    path: '/requests/:id',
    element: (
      <ProtectedRoute>
        <AppShell>
          <RequestDetailPage />
        </AppShell>
      </ProtectedRoute>
    ),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
