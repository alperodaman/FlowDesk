import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/components/layout/PageHeader';
import { Button } from '@/shared/components/ui/Button';
import { IconPlus } from '@/shared/components/ui/icons';
import { RequestFilters } from '../components/RequestFilters';
import { RequestList } from '../components/RequestList';
import { ROUTES } from '@/constants/routes';

export function RequestListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  const handleReset = () => {
    setSearch('');
    setStatus('');
    setType('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requests"
        subtitle="View and manage all your requests."
        action={
          <Button
            leftIcon={<IconPlus size={16} />}
            onClick={() => navigate(ROUTES.REQUEST_CREATE)}
          >
            New Request
          </Button>
        }
      />

      <RequestFilters
        search={search}
        status={status}
        type={type}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onReset={handleReset}
      />

      <RequestList search={search} status={status} type={type} />
    </div>
  );
}
