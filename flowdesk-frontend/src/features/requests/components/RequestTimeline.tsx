import clsx from 'clsx';
import { IconCheckCircle, IconClock, IconXCircle, IconFileText } from '@/shared/components/ui/icons';

interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  type: 'created' | 'submitted' | 'approved' | 'rejected' | 'comment';
}

interface RequestTimelineProps {
  events: TimelineEvent[];
}

const eventConfig = {
  created: { Icon: IconFileText, bg: 'bg-info-bg', text: 'text-info' },
  submitted: { Icon: IconClock, bg: 'bg-warning-bg', text: 'text-warning' },
  approved: { Icon: IconCheckCircle, bg: 'bg-success-bg', text: 'text-success' },
  rejected: { Icon: IconXCircle, bg: 'bg-danger-bg', text: 'text-danger' },
  comment: { Icon: IconFileText, bg: 'bg-brand-100', text: 'text-brand-700' },
};

export function RequestTimeline({ events }: RequestTimelineProps) {
  return (
    <ol className="relative space-y-0" aria-label="Request history">
      {events.map((event, idx) => {
        const { Icon, bg, text } = eventConfig[event.type];
        const isLast = idx === events.length - 1;

        return (
          <li key={event.id} className="relative flex gap-4 pb-6">
            {/* Vertical line */}
            {!isLast && (
              <div
                className="absolute left-4 top-8 h-full w-px bg-border"
                aria-hidden="true"
              />
            )}

            {/* Icon */}
            <div
              className={clsx(
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                bg,
              )}
            >
              <Icon size={15} className={text} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm font-medium text-ink">{event.title}</p>
              {event.description && (
                <p className="mt-0.5 text-sm text-ink-muted">{event.description}</p>
              )}
              <p className="mt-1 text-xs text-ink-subtle">{event.timestamp}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
