import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '@/constants/routes';
import {
  IconLayoutDashboard,
  IconClipboardList,
  IconCheckCircle,
  IconBell,
  IconUser,
} from '@/shared/components/ui/icons';

const mobileNavItems = [
  { label: 'Home', path: ROUTES.DASHBOARD, Icon: IconLayoutDashboard },
  { label: 'Requests', path: ROUTES.REQUESTS, Icon: IconClipboardList },
  { label: 'Approvals', path: ROUTES.APPROVALS, Icon: IconCheckCircle },
  { label: 'Alerts', path: ROUTES.NOTIFICATIONS, Icon: IconBell },
  { label: 'Profile', path: ROUTES.PROFILE, Icon: IconUser },
];

export function MobileNavigation() {
  return (
    <nav className="shrink-0 border-t border-border bg-surface md:hidden" aria-label="Mobile navigation">
      <ul className="flex">
        {mobileNavItems.map(({ label, path, Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                  isActive ? 'text-brand-700' : 'text-ink-subtle hover:text-ink-muted',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-brand-700' : ''} />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
