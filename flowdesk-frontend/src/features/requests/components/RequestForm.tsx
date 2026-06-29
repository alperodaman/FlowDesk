import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestSchema, type RequestFormValues } from '../schemas/requestSchema';
import { useCreateRequest } from '../hooks/useCreateRequest';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Button } from '@/shared/components/ui/Button';
import { FormField } from '@/shared/components/ui/FormField';
import { Alert } from '@/shared/components/feedback/Alert';
import { Card } from '@/shared/components/data-display/Card';

export function RequestForm() {
  const createRequest = useCreateRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { title: '', type: 'purchase' },
  });

  const onSubmit = (values: RequestFormValues) => {
    createRequest.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {createRequest.isError && (
        <Alert variant="danger" title="Could not create request">
          An error occurred. Please check the form and try again.
        </Alert>
      )}

      {/* Section 1 — Basic info */}
      <Card>
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <FormField label="Title" htmlFor="title" required error={errors.title?.message}>
              <Input
                id="title"
                placeholder="e.g. Laptop Purchase Request"
                error={!!errors.title}
                {...register('title')}
              />
            </FormField>
          </div>

          <FormField label="Request Type" htmlFor="type" required>
            <Select id="type" {...register('type')}>
              <option value="purchase">Purchase</option>
              <option value="leave">Leave</option>
              <option value="access">Access</option>
            </Select>
          </FormField>

          <FormField label="Priority" htmlFor="priority">
            <Select id="priority">
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </Select>
          </FormField>
        </div>
      </Card>

      {/* Section 2 — Details */}
      <Card>
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Details
        </h2>
        <div className="grid grid-cols-1 gap-5">
          <FormField
            label="Description"
            htmlFor="description"
            hint="Provide as much context as possible to help approvers make a decision."
          >
            <Textarea
              id="description"
              placeholder="Describe your request in detail…"
              rows={5}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Requested Date" htmlFor="requestedDate">
              <Input id="requestedDate" type="date" />
            </FormField>
            <FormField label="Deadline (optional)" htmlFor="deadline">
              <Input id="deadline" type="date" />
            </FormField>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" type="button">
          Save as Draft
        </Button>
        <Button type="submit" loading={createRequest.isPending}>
          Submit Request
        </Button>
      </div>
    </form>
  );
}
