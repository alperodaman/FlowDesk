import { Link } from 'react-router-dom';
import { useRequests } from '../hooks/useRequests';

export function RequestList() {
  const { data, isLoading, isError } = useRequests();

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  if (isError) {
    return <p>Request listesi alınamadı.</p>;
  }

  if (!data?.length) {
    return <p>Henüz request yok.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <ul className="divide-y">
        {data.map((request) => (
          <li key={request.id} className="p-4">
            <Link to={`/requests/${request.id}`} className="flex items-center justify-between">
              <span className="font-medium">{request.title}</span>
              <span className="text-sm text-slate-500">{request.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
