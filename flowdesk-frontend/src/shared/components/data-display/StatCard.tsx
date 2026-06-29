import type { ReactNode } from 'react';
import clsx from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: { value: string; positive: boolean };
  accent?: 'brand' | 'success' | 'warning' | 'danger' | 'info';
}

const accentClasses = {
  brand: 'bg-brand-100 text-brand-700',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  danger: 'bg-danger-bg text-danger',
  info: 'bg-info-bg text-info',
};

export function StatCard({ label, value, icon, trend, accent = 'brand' }: StatCardProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-muted">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
          {trend && (
            <p
              className={clsx(
                'mt-1.5 text-xs font-medium',
                trend.positive ? 'text-success' : 'text-danger',
              )}
            >
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className={clsx('flex h-10 w-10 shrink-0 items-center justify-center rounded-control', accentClasses[accent])}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
