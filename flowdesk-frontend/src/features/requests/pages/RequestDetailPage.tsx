import { useParams } from 'react-router-dom';

export function RequestDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Request Detail</h1>
      <p>Request ID: {id}</p>
    </div>
  );
}
