import { RequestList } from '../components/RequestList';

export function RequestListPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Requests</h1>
      <RequestList />
    </div>
  );
}
