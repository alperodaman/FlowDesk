import type { RequestStatus } from '@/types/domain.types';
import { SearchInput } from '@/shared/components/ui/SearchInput';
import { Select } from '@/shared/components/ui/Select';
import { Button } from '@/shared/components/ui/Button';
import { IconX } from '@/shared/components/ui/icons';

interface RequestFiltersProps {
  search: string;
  status: string;
  type: string;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onReset: () => void;
}

const statusOptions: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const typeOptions = [
  { value: '', label: 'All types' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'leave', label: 'Leave' },
  { value: 'access', label: 'Access' },
];

export function RequestFilters({
  search,
  status,
  type,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onReset,
}: RequestFiltersProps) {
  const hasActiveFilters = search || status || type;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <SearchInput
          placeholder="Search requests…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-36"
          aria-label="Filter by status"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Select>

        <Select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-32"
          aria-label="Filter by type"
        >
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="md"
            onClick={onReset}
            leftIcon={<IconX size={14} />}
            aria-label="Clear filters"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
