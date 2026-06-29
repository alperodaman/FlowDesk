import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { IconBell, IconSearch } from '@/shared/components/ui/icons';
import { useAuthStore } from '@/features/auth/store/authStore';

export function TopHeader() {
  const { user } = useAuthStore();

  return (
    <header className="hidden h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-6 md:flex">
      {/* Search */}
      <div className="relative w-72">
        <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input
          type="search"
          placeholder="Search…"
          className="h-9 w-full rounded-control border border-border bg-app-bg pl-9 pr-3 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link
          to={ROUTES.NOTIFICATIONS}
          className="relative flex h-9 w-9 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-app-bg hover:text-ink"
          aria-label="Notifications"
        >
          <IconBell size={18} />
          {/* Unread dot */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
        </Link>

        {/* User avatar */}
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center gap-2.5 rounded-control px-2 py-1.5 transition-colors hover:bg-app-bg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-xs font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
          </div>
          <span className="hidden text-sm font-medium text-ink xl:block">{user?.name ?? 'User'}</span>
        </Link>
      </div>
    </header>
  );
}
