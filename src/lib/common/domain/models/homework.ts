import { BaseModel } from './base-model';

export const HomeWorkStatus = {
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  OVERDUE: 'OVERDUE',
};

export type HomeWorkStatus = keyof typeof HomeWorkStatus;

export type HomeWork = BaseModel & {
  name: string;
  description: string;
  closedAt: string;
  closeAt: string;

  courseId: string;

  status: HomeWorkStatus;
};
