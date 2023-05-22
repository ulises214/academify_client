import { HomeWorkAsignmentStatus } from '../models/assignment';

const AssignmentStatusLabels: Record<HomeWorkAsignmentStatus, string> = {
  DELIVERED: 'Entregado',
  DELIVERED_LATE: 'Entregado tarde',
  EVALUATED: 'Evaluado',
  UNDELIVERED: 'No entregado',
} as const;

export const getAssignmentStatusLabel = (
  status: HomeWorkAsignmentStatus
): string => AssignmentStatusLabels[status];
