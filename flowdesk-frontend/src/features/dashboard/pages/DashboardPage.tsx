import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { StatCard } from '@/shared/components/data-display/StatCard';
import { Card, CardHeader } from '@/shared/components/data-display/Card';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Button } from '@/shared/components/ui/Button';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import {
  IconClipboardList,
  IconCheckCircle,
  IconClock,
  IconXCircle,
  IconPlus,
} from '@/shared/components/ui/icons';
import { ROUTES } from '@/constants/routes';
import type { RequestStatus } from '@/types/domain.types';

const MOCK_STATS = [
  { label: 'Total Requests', value: 24, icon: <IconClipboardList size={20} />, accent: 'brand' as const },
  { label: 'Pending Approvals', value: 5, icon: <IconClock size={20} />, accent: 'warning' as const },
  { label: 'Approved', value: 16, icon: <IconCheckCircle size={20} />, accent: 'success' as const },
  { label: 'Rejected', value: 3, icon: <IconXCircle size={20} />, accent: 'danger' as const },
];

interface RecentRequest {
  id: string;
  title: string;
  type: string;
  status: RequestStatus;
  date: string;
}

const MOCK_RECENT: RecentRequest[] = [
  { id: '1', title: 'Laptop Purchase Request', type: 'Purchase', status: 'submitted', date: 'Jun 28, 2026' },
  { id: '2', title: 'Annual Leave — July 2026', type: 'Leave', status: 'approved', date: 'Jun 26, 2026' },
  { id: '3', title: 'AWS Access — Production', type: 'Access', status: 'submitted', date: 'Jun 25, 2026' },
  { id: '4', title: 'Conference Travel Budget', type: 'Purchase', status: 'rejected', date: 'Jun 23, 2026' },
  { id: '5', title: 'Software License Renewal', type: 'Purchase', status: 'draft', date: 'Jun 22, 2026' },
];

const MOCK_PENDING_APPROVALS = [
  { id: 'a1', title: 'Laptop Purchase Request', requester: 'Alice Kim', date: 'Jun 28, 2026' },
  { id: 'a2', title: 'Remote Work Equipment', requester: 'Bob Carter', date: 'Jun 27, 2026' },
  { id: 'a3', title: 'Marketing Budget Q3', requester: 'Clara Stone', date: 'Jun 26, 2026' },
];

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back. Here's what needs your attention."
        action={
          <Button
            leftIcon={<IconPlus size={16} />}
            onClick={() => navigate(ROUTES.REQUEST_CREATE)}
          >
            New Request
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {MOCK_STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 xl:grid-cols-5">
        {/* Recent requests */}
        <div className="xl:col-span-3">
          <Card padding="none">
            <div className="border-b border-border px-5 py-4">
              <CardHeader
                title="Recent Requests"
                action={
                  <Link
                    to={ROUTES.REQUESTS}
                    className="text-xs font-medium text-brand-700 hover:text-brand-800"
                  >
                    View all
                  </Link>
                }
              />
            </div>

            {MOCK_RECENT.length === 0 ? (
              <EmptyState
                title="No requests yet"
                description="Create your first request to get started."
                action={
                  <Button size="sm" leftIcon={<IconPlus size={14} />} onClick={() => navigate(ROUTES.REQUEST_CREATE)}>
                    New Request
                  </Button>
                }
              />
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-app-bg text-left text-xs font-medium uppercase tracking-wide text-ink-muted">
                        <th className="px-5 py-3">Title</th>
                        <th className="px-5 py-3">Type</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_RECENT.map((r) => (
                        <tr key={r.id} className="border-b border-border last:border-0 hover:bg-app-bg">
                          <td className="px-5 py-3.5">
                            <Link
                              to={`/requests/${r.id}`}
                              className="font-medium text-ink hover:text-brand-700"
                            >
                              {r.title}
                            </Link>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-ink-muted">{r.type}</td>
                          <td className="px-5 py-3.5">
                            <StatusBadge status={r.status} size="sm" />
                          </td>
                          <td className="px-5 py-3.5 text-right text-sm text-ink-muted">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card list */}
                <ul className="divide-y divide-border md:hidden">
                  {MOCK_RECENT.map((r) => (
                    <li key={r.id}>
                      <Link
                        to={`/requests/${r.id}`}
                        className="flex items-center justify-between gap-4 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">{r.title}</p>
                          <p className="mt-0.5 text-xs text-ink-muted">{r.type} · {r.date}</p>
                        </div>
                        <StatusBadge status={r.status} size="sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        </div>

        {/* Pending approvals */}
        <div className="xl:col-span-2">
          <Card padding="none">
            <div className="border-b border-border px-5 py-4">
              <CardHeader
                title="Awaiting Your Approval"
                action={
                  <Link
                    to={ROUTES.APPROVALS}
                    className="text-xs font-medium text-brand-700 hover:text-brand-800"
                  >
                    View all
                  </Link>
                }
              />
            </div>

            {MOCK_PENDING_APPROVALS.length === 0 ? (
              <EmptyState title="All caught up!" description="No pending approvals." />
            ) : (
              <ul className="divide-y divide-border">
                {MOCK_PENDING_APPROVALS.map((a) => (
                  <li key={a.id} className="px-5 py-4">
                    <Link to={`/approvals/${a.id}`} className="group block">
                      <p className="font-medium text-ink group-hover:text-brand-700">{a.title}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">{a.requester} · {a.date}</p>
                      <div className="mt-3 flex gap-2">
                        <button className="inline-flex h-7 items-center rounded-control bg-success-bg px-2.5 text-xs font-medium text-success transition-colors hover:bg-green-200">
                          Approve
                        </button>
                        <button className="inline-flex h-7 items-center rounded-control bg-danger-bg px-2.5 text-xs font-medium text-danger transition-colors hover:bg-red-200">
                          Reject
                        </button>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
