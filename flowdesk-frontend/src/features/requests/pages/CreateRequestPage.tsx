import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import { IconArrowLeft } from '@/shared/components/ui/icons';
import { RequestForm } from '../components/RequestForm';
import { ROUTES } from '@/constants/routes';

export function CreateRequestPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Request"
        subtitle="Fill in the details below and submit for approval."
        action={
          <Button
            variant="ghost"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={() => navigate(ROUTES.REQUESTS)}
          >
            Back to Requests
          </Button>
        }
      />

      <div className="mx-auto max-w-3xl">
        <RequestForm />
      </div>
    </div>
  );
}
