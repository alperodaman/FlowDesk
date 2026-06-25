import type { Request } from '@/types/domain.types';

export type RequestListItem = Request;

export interface CreateRequestPayload {
  title: string;
  type: 'purchase' | 'leave' | 'access';
}
