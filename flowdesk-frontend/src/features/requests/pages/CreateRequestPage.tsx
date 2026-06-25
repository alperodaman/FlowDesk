import { RequestForm } from '../components/RequestForm';

export function CreateRequestPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Yeni Request</h1>
      <RequestForm />
    </div>
  );
}
