import { useState } from 'react';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/data-display/Card';
import { Avatar } from '@/shared/components/ui/Avatar';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { SearchInput } from '@/shared/components/ui/SearchInput';
import { Select } from '@/shared/components/ui/Select';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { Pagination } from '@/shared/components/data-display/Pagination';
import { IconPlus, IconUsers, IconEdit } from '@/shared/components/ui/icons';

const MOCK_USERS = [
  { id: 'u1', name: 'Alice Kim', email: 'alice@company.com', role: 'Employee', department: 'Engineering', status: 'approved' as const },
  { id: 'u2', name: 'Bob Carter', email: 'bob@company.com', role: 'Manager', department: 'Engineering', status: 'approved' as const },
  { id: 'u3', name: 'Clara Stone', email: 'clara@company.com', role: 'Approver', department: 'Finance', status: 'approved' as const },
  { id: 'u4', name: 'Dan Flores', email: 'dan@company.com', role: 'Employee', department: 'Marketing', status: 'pending' as const },
  { id: 'u5', name: 'Eva Ross', email: 'eva@company.com', role: 'Administrator', department: 'IT', status: 'approved' as const },
  { id: 'u6', name: 'Frank Lee', email: 'frank@company.com', role: 'Employee', department: 'Sales', status: 'draft' as const },
];

const PAGE_SIZE = 10;

export function UserListPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !role || u.role === role;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        subtitle="Manage user accounts and roles."
        action={
          <Button leftIcon={<IconPlus size={16} />}>
            Invite User
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchInput
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-40"
          aria-label="Filter by role"
        >
          <option value="">All roles</option>
          <option value="Employee">Employee</option>
          <option value="Approver">Approver</option>
          <option value="Manager">Manager</option>
          <option value="Administrator">Administrator</option>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<IconUsers size={28} />}
          title="No users found"
          description="No users match your current search or filter."
        />
      ) : (
        <>
          <Card padding="none">
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-app-bg text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="hidden px-5 py-3.5 xl:table-cell">Department</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-app-bg">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size="sm" />
                          <div>
                            <p className="font-medium text-ink">{u.name}</p>
                            <p className="text-xs text-ink-muted">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-ink-muted">{u.role}</td>
                      <td className="hidden px-5 py-4 text-ink-muted xl:table-cell">{u.department}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={u.status} size="sm" />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-brand-100 hover:text-brand-700"
                          aria-label={`Edit ${u.name}`}
                        >
                          <IconEdit size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <ul className="divide-y divide-border md:hidden">
              {filtered.map((u) => (
                <li key={u.id} className="flex items-center gap-3 px-5 py-4">
                  <Avatar name={u.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{u.name}</p>
                    <p className="truncate text-xs text-ink-muted">{u.email}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{u.role} · {u.department}</p>
                  </div>
                  <StatusBadge status={u.status} size="sm" />
                </li>
              ))}
            </ul>
          </Card>

          <Pagination
            page={page}
            totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
