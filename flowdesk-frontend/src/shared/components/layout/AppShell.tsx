import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to={ROUTES.HOME} className="text-lg font-semibold">
            Flow Desk
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link to={ROUTES.REQUESTS}>Requests</Link>
            <Link to={ROUTES.REQUEST_CREATE}>New Request</Link>
            <Link to={ROUTES.LOGIN}>Login</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
