import clsx from 'clsx';

type Status = 'approved' | 'pending' | 'rejected' | 'draft' | 'submitted' | 'cancelled' | 'info';

interface StatusBadgeProps {
  status: Status;
  label?: string;
  size?: 'sm' | 'md';
}

const config: Record<Status, { label: string; className: string; dot: string }> = {
  approved: {
    label: 'Approved',
    className: 'bg-success-bg text-success border-success-border',
    dot: 'bg-success',
  },
  pending: {
    label: 'Pending',
    className: 'bg-warning-bg text-warning border-warning-border',
    dot: 'bg-warning',
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-info-bg text-info border-info-border',
    dot: 'bg-info',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-danger-bg text-danger border-danger-border',
    dot: 'bg-danger',
  },
  draft: {
    label: 'Draft',
    className: 'bg-app-bg text-ink-muted border-border',
    dot: 'bg-ink-subtle',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-app-bg text-ink-muted border-border',
    dot: 'bg-ink-subtle',
  },
  info: {
    label: 'Info',
    className: 'bg-info-bg text-info border-info-border',
    dot: 'bg-info',
  },
};

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const { label: defaultLabel, className, dot } = config[status];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className,
      )}
    >
      <span className={clsx('h-1.5 w-1.5 shrink-0 rounded-full', dot)} aria-hidden="true" />
      {label ?? defaultLabel}
    </span>
  );
}
