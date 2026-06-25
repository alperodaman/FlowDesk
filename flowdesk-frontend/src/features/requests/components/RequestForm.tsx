import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestSchema, type RequestFormValues } from '../schemas/requestSchema';
import { useCreateRequest } from '../hooks/useCreateRequest';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

export function RequestForm() {
  const createRequest = useCreateRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: '',
      type: 'purchase',
    },
  });

  const onSubmit = (values: RequestFormValues) => {
    createRequest.mutate(values);
  };

  return (
    <form className="space-y-4 rounded-xl bg-white p-6 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm font-medium">Başlık</label>
        <Input {...register('title')} />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Tip</label>
        <select
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          {...register('type')}
        >
          <option value="purchase">Purchase</option>
          <option value="leave">Leave</option>
          <option value="access">Access</option>
        </select>
      </div>

      <Button type="submit" loading={createRequest.isPending}>
        Oluştur
      </Button>
    </form>
  );
}
