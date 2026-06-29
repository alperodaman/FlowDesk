import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Card } from '@/shared/components/data-display/Card';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { SearchInput } from '@/shared/components/ui/SearchInput';
import { Select } from '@/shared/components/ui/Select';
import { IconCheckCircle } from '@/shared/components/ui/icons';

const MOCK_APPROVALS = [
  {
    id: 'a1',
    title: 'Laptop Purchase Request',
    requester: 'Alice Kim',
    type: 'Purchase',
    priority: 'High',
    submittedAt: 'Jun 28, 2026',
    status: 'pending' as const,
  },
  {
    id: 'a2',
    title: 'Remote Work Equipment',
    requester: 'Bob Carter',
    type: 'Purchase',
    priority: 'Normal',
    submittedAt: 'Jun 27, 2026',
    status: 'pending' as const,
  },
  {
    id: 'a3',
    title: 'Marketing Budget Q3',
    requester: 'Clara Stone',
    type: 'Purchase',
    priority: 'Urgent',
    submittedAt: 'Jun 26, 2026',
    status: 'pending' as const,
  },
  {
    id: 'a4',
    title: 'Annual Leave — July 2026',
    requester: 'Dan Flores',
    type: 'Leave',
    priority: 'Normal',
    submittedAt: 'Jun 24, 2026',
    status: 'approved' as const,
  },
];

export function ApprovalListPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('pending');

  const filtered = MOCK_APPROVALS.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.requester.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filter || a.status === filter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approvals"
        subtitle="Review and act on requests awaiting your decision."
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchInput
            placeholder="Search by title or requester…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-40"
          aria-label="Filter by status"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </Select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<IconCheckCircle size={28} />}
          title="All caught up!"
          description="No approvals match your current filters."
        />
      ) : (
        <Card padding="none">
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-app-bg text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  <th className="px-5 py-3.5">Request</th>
                  <th className="px-5 py-3.5">Requester</th>
                  <th className="hidden px-5 py-3.5 xl:table-cell">Type</th>
                  <th className="hidden px-5 py-3.5 xl:table-cell">Priority</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-app-bg">
                    <td className="px-5 py-4">
                      <Link
                        to={`/approvals/${a.id}`}
                        className="font-medium text-ink hover:text-brand-700"
                      >
                        {a.title}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar name={a.requester} size="sm" />
                        <span className="text-ink-muted">{a.requester}</span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-4 text-ink-muted xl:table-cell">{a.type}</td>
                    <td className="hidden px-5 py-4 xl:table-cell">
                      <span className="text-sm text-ink-muted">{a.priority}</span>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{a.submittedAt}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={a.status} size="sm" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {a.status === 'pending' && (
                        <Link
                          to={`/approvals/${a.id}`}
                          className="text-xs font-medium text-brand-700 hover:text-brand-800"
                        >
                          Review →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <ul className="divide-y divide-border md:hidden">
            {filtered.map((a) => (
              <li key={a.id}>
                <Link to={`/approvals/${a.id}`} className="flex items-start gap-3 px-5 py-4">
                  <Avatar name={a.requester} size="sm" className="mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{a.title}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{a.requester} · {a.submittedAt}</p>
                  </div>
                  <StatusBadge status={a.status} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
