import type { Permission } from '@/constants/permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
}

export type RequestStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export interface Request {
  id: string;
  title: string;
  type: 'purchase' | 'leave' | 'access';
  status: RequestStatus;
  createdAt: string;
  requesterId: string;
}

export interface Approval {
  id: string;
  requestId: string;
  approverId: string;
  status: 'pending' | 'approved' | 'rejected';
}
