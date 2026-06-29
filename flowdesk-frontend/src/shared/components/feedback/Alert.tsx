import type { ReactNode } from 'react';
import clsx from 'clsx';
import {
  IconCheckCircle,
  IconAlertCircle,
  IconInfo,
  IconX,
} from '@/shared/components/ui/icons';

type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const config: Record<AlertVariant, { container: string; icon: string; Icon: React.ComponentType<{size?: number; className?: string}> }> = {
  success: {
    container: 'bg-success-bg border-success-border text-success',
    icon: 'text-success',
    Icon: IconCheckCircle,
  },
  warning: {
    container: 'bg-warning-bg border-warning-border text-warning',
    icon: 'text-warning',
    Icon: IconAlertCircle,
  },
  danger: {
    container: 'bg-danger-bg border-danger-border text-danger',
    icon: 'text-danger',
    Icon: IconAlertCircle,
  },
  info: {
    container: 'bg-info-bg border-info-border text-info',
    icon: 'text-info',
    Icon: IconInfo,
  },
};

export function Alert({ variant = 'info', title, children, onDismiss, className }: AlertProps) {
  const { container, icon, Icon } = config[variant];

  return (
    <div
      role="alert"
      className={clsx(
        'flex gap-3 rounded-control border p-4 text-sm',
        container,
        className,
      )}
    >
      <Icon size={16} className={clsx('mt-0.5 shrink-0', icon)} />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={clsx(title && 'mt-0.5', 'opacity-90')}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}
