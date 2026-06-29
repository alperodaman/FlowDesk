import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/data-display/Card';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { IconBell, IconCheckCircle, IconClipboardList, IconXCircle } from '@/shared/components/ui/icons';

interface Notification {
  id: string;
  title: string;
  body: string;
  link?: string;
  type: 'approval' | 'request' | 'rejection' | 'info';
  read: boolean;
  timestamp: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Request approved',
    body: 'Your "Annual Leave — July 2026" request has been approved by Bob Carter.',
    link: '/requests/2',
    type: 'approval',
    read: false,
    timestamp: 'Jun 28, 2026 at 11:40',
  },
  {
    id: 'n2',
    title: 'Approval needed',
    body: 'Alice Kim submitted "Laptop Purchase Request" and is awaiting your review.',
    link: '/approvals/a1',
    type: 'request',
    read: false,
    timestamp: 'Jun 28, 2026 at 09:15',
  },
  {
    id: 'n3',
    title: 'Request rejected',
    body: '"Conference Travel Budget" was rejected by the finance team.',
    link: '/requests/4',
    type: 'rejection',
    read: true,
    timestamp: 'Jun 24, 2026 at 16:02',
  },
  {
    id: 'n4',
    title: 'Approval needed',
    body: 'Bob Carter submitted "Remote Work Equipment" for your approval.',
    link: '/approvals/a2',
    type: 'request',
    read: true,
    timestamp: 'Jun 23, 2026 at 10:30',
  },
];

const typeIcon = {
  approval: <IconCheckCircle size={18} className="text-success" />,
  request: <IconClipboardList size={18} className="text-brand-700" />,
  rejection: <IconXCircle size={18} className="text-danger" />,
  info: <IconBell size={18} className="text-info" />,
};

const typeBg = {
  approval: 'bg-success-bg',
  request: 'bg-brand-100',
  rejection: 'bg-danger-bg',
  info: 'bg-info-bg',
};

export function NotificationListPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const displayed = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up.'}
        action={
          unreadCount > 0 ? (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              Mark all as read
            </Button>
          ) : undefined
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-border">
        {(['all', 'unread'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={clsx(
              'px-4 pb-3 text-sm font-medium capitalize transition-colors',
              filter === tab
                ? 'border-b-2 border-brand-700 text-brand-700'
                : 'text-ink-muted hover:text-ink',
            )}
          >
            {tab}
            {tab === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-brand-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <EmptyState
          icon={<IconBell size={28} />}
          title="No notifications"
          description={filter === 'unread' ? 'You have no unread notifications.' : 'Nothing to show yet.'}
        />
      ) : (
        <Card padding="none">
          <ul className="divide-y divide-border">
            {displayed.map((n) => {
              const content = (
                <div
                  className={clsx(
                    'flex items-start gap-4 px-5 py-4 transition-colors',
                    !n.read ? 'bg-brand-50' : 'hover:bg-app-bg',
                    n.link && 'cursor-pointer',
                  )}
                  onClick={() => markRead(n.id)}
                >
                  <div
                    className={clsx(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                      typeBg[n.type],
                    )}
                  >
                    {typeIcon[n.type]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className={clsx('text-sm font-medium', !n.read ? 'text-ink' : 'text-ink-muted')}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-brand-700"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{n.body}</p>
                    <p className="mt-1 text-xs text-ink-subtle">{n.timestamp}</p>
                  </div>
                </div>
              );

              return (
                <li key={n.id}>
                  {n.link ? (
                    <Link to={n.link} className="block">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
