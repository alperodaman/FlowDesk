import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '@/constants/routes';
import {
  IconLayoutDashboard,
  IconClipboardList,
  IconCheckCircle,
  IconBell,
  IconSettings,
  IconLogOut,
  IconShield,
} from '@/shared/components/ui/icons';
import { useAuthStore } from '@/features/auth/store/authStore';

interface NavItem {
  label: string;
  path: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, Icon: IconLayoutDashboard },
  { label: 'Requests', path: ROUTES.REQUESTS, Icon: IconClipboardList },
  { label: 'Approvals', path: ROUTES.APPROVALS, Icon: IconCheckCircle },
  { label: 'Notifications', path: ROUTES.NOTIFICATIONS, Icon: IconBell },
];

const adminItems: NavItem[] = [
  { label: 'Users', path: ROUTES.ADMIN_USERS, Icon: IconSettings },
  { label: 'Roles', path: ROUTES.ADMIN_ROLES, Icon: IconShield },
];

interface SidebarProps {
  onClose?: () => void;
  mobileMode?: boolean;
}

export function Sidebar({ onClose, mobileMode = false }: SidebarProps) {
  const { user, clearAuth } = useAuthStore();

  return (
    <aside
      className={clsx(
        'flex h-full flex-col',
        mobileMode
          ? 'w-64 bg-brand-700'
          : 'hidden w-[72px] bg-brand-700 xl:w-64 md:flex',
      )}
    >
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center gap-3 px-4 xl:px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-white/15">
          <span className="text-sm font-bold text-white">F</span>
        </div>
        <span className={clsx('text-base font-semibold text-white', !mobileMode && 'hidden xl:block')}>
          FlowDesk
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3">
        <div className="flex flex-col gap-0.5">
          {navItems.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-800 text-white'
                    : 'text-brand-100 hover:bg-white/10 hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={clsx('shrink-0', isActive ? 'text-white' : 'text-brand-200 group-hover:text-white')}
                  />
                  <span className={clsx(!mobileMode && 'hidden xl:block')}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Admin section */}
        <div className="mt-4 flex flex-col gap-0.5">
          <p className={clsx('mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-brand-300', !mobileMode && 'hidden xl:block')}>
            Admin
          </p>
          {adminItems.map(({ label, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'group flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-800 text-white'
                    : 'text-brand-100 hover:bg-white/10 hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={clsx('shrink-0', isActive ? 'text-white' : 'text-brand-200 group-hover:text-white')}
                  />
                  <span className={clsx(!mobileMode && 'hidden xl:block')}>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
          </div>
          <div className={clsx('min-w-0 flex-1', !mobileMode && 'hidden xl:block')}>
            <p className="truncate text-sm font-medium text-white">{user?.name ?? 'User'}</p>
            <p className="truncate text-xs text-brand-200">{user?.email ?? ''}</p>
          </div>
          <button
            onClick={clearAuth}
            className={clsx(
              'shrink-0 rounded-control p-1.5 text-brand-200 transition-colors hover:bg-white/10 hover:text-white',
              !mobileMode && 'hidden xl:flex',
            )}
            title="Sign out"
            aria-label="Sign out"
          >
            <IconLogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
