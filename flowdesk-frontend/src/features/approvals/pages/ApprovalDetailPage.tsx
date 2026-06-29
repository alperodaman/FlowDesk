import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/data-display/Card';
import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Modal } from '@/shared/components/ui/Modal';
import { FormField } from '@/shared/components/ui/FormField';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Alert } from '@/shared/components/feedback/Alert';
import { RequestTimeline } from '@/features/requests/components/RequestTimeline';
import { ROUTES } from '@/constants/routes';
import { IconArrowLeft, IconCheckCircle, IconXCircle } from '@/shared/components/ui/icons';

type ApprovalStatus = 'pending' | 'approved' | 'rejected';

interface Approver {
  name: string;
  role: string;
  status: ApprovalStatus;
}

interface MockApproval {
  id: string;
  title: string;
  requester: { name: string; email: string; department: string };
  type: string;
  priority: string;
  submittedAt: string;
  status: ApprovalStatus;
  description: string;
  approvers: Approver[];
}

const MOCK: MockApproval = {
  id: 'a1',
  title: 'Laptop Purchase Request',
  requester: { name: 'Alice Kim', email: 'alice@company.com', department: 'Engineering' },
  type: 'Purchase',
  priority: 'High',
  submittedAt: 'Jun 28, 2026 at 09:14',
  status: 'pending',
  description:
    'I need a new MacBook Pro 14" for development work. My current laptop is 4 years old and is struggling with our build times. This will significantly improve productivity.',
  approvers: [
    { name: 'Bob Carter', role: 'Manager', status: 'approved' },
    { name: 'You', role: 'Finance', status: 'pending' },
  ],
};

const MOCK_TIMELINE = [
  { id: '1', title: 'Request created', description: 'Created by Alice Kim', timestamp: 'Jun 28, 2026 at 09:14', type: 'created' as const },
  { id: '2', title: 'Submitted for approval', timestamp: 'Jun 28, 2026 at 09:15', type: 'submitted' as const },
  { id: '3', title: 'Approved by Bob Carter', description: 'Manager approval granted', timestamp: 'Jun 28, 2026 at 11:40', type: 'approved' as const },
];

export function ApprovalDetailPage() {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejected, setRejected] = useState(false);

  const request = MOCK;
  const canDecide = request.status === 'pending' && !approved && !rejected;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Request"
        action={
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<IconArrowLeft size={15} />}
            onClick={() => navigate(ROUTES.APPROVALS)}
          >
            Back to Approvals
          </Button>
        }
      />

      {approved && (
        <Alert variant="success" title="Request approved">
          You have approved this request. The requester has been notified.
        </Alert>
      )}
      {rejected && (
        <Alert variant="danger" title="Request rejected">
          You have rejected this request. The requester has been notified.
        </Alert>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-5 xl:col-span-2">
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-ink">{request.title}</h2>
              <StatusBadge status={request.status} />
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {[
                { label: 'Type', value: request.type },
                { label: 'Priority', value: request.priority },
                { label: 'Department', value: request.requester.department },
                { label: 'Submitted', value: request.submittedAt },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs font-medium text-ink-muted">{label}</dt>
                  <dd className="mt-0.5 text-ink">{value}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="text-xs font-medium text-ink-muted">Requested by</dt>
                <dd className="mt-1 flex items-center gap-2.5">
                  <Avatar name={request.requester.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">{request.requester.name}</p>
                    <p className="text-xs text-ink-muted">{request.requester.email}</p>
                  </div>
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="mb-3 text-sm font-semibold text-ink">Description</h2>
            <p className="text-sm leading-relaxed text-ink-muted">{request.description}</p>
          </Card>

          {canDecide && (
            <Card>
              <h2 className="mb-4 text-sm font-semibold text-ink">Your Decision</h2>
              <p className="mb-5 text-sm text-ink-muted">
                Review the request above and choose to approve or reject.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  leftIcon={<IconCheckCircle size={16} />}
                  className="flex-1 sm:flex-none"
                  onClick={() => setApproved(true)}
                >
                  Approve Request
                </Button>
                <Button
                  variant="danger"
                  leftIcon={<IconXCircle size={16} />}
                  onClick={() => setRejectOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  Reject Request
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right */}
        <div className="space-y-5">
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-ink">Approval Chain</h2>
            <ul className="space-y-3">
              {request.approvers.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={a.name} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-ink">{a.name}</p>
                      <p className="text-xs text-ink-muted">{a.role}</p>
                    </div>
                  </div>
                  <StatusBadge status={a.status} size="sm" />
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="mb-4 text-sm font-semibold text-ink">History</h2>
            <RequestTimeline events={MOCK_TIMELINE} />
          </Card>
        </div>
      </div>

      <Modal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Reject Request"
        footer={
          <>
            <Button variant="ghost" onClick={() => setRejectOpen(false)}>Cancel</Button>
            <Button
              variant="danger"
              disabled={!rejectReason.trim()}
              onClick={() => { setRejected(true); setRejectOpen(false); setRejectReason(''); }}
            >
              Confirm Rejection
            </Button>
          </>
        }
      >
        <p className="mb-4 text-sm text-ink-muted">
          Please provide a reason so the requester understands why their request was rejected.
        </p>
        <FormField label="Rejection Reason" htmlFor="rejectReason" required>
          <Textarea
            id="rejectReason"
            placeholder="e.g. Budget not available for this quarter…"
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </FormField>
      </Modal>
    </div>
  );
}
