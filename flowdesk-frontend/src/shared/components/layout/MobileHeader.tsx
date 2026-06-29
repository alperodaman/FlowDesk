import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { IconMenu, IconBell } from '@/shared/components/ui/icons';

interface MobileHeaderProps {
  onMenuOpen: () => void;
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:hidden">
      <button
        onClick={onMenuOpen}
        className="flex h-9 w-9 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-app-bg hover:text-ink"
        aria-label="Open navigation menu"
      >
        <IconMenu size={20} />
      </button>

      <span className="text-base font-semibold text-ink">FlowDesk</span>

      <Link
        to={ROUTES.NOTIFICATIONS}
        className="relative flex h-9 w-9 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-app-bg hover:text-ink"
        aria-label="Notifications"
      >
        <IconBell size={20} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
      </Link>
    </header>
  );
}
