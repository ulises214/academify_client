import { BaseModel } from './base-model';

const HomeWorkAsignmentStatus = {
  UNDELIVERED: 'UNDELIVERED',
  DELIVERED: 'DELIVERED',
  DELIVERED_LATE: 'DELIVERED_LATE',
  EVALUATED: 'EVALUATED',
};
export type HomeWorkAsignmentStatus = keyof typeof HomeWorkAsignmentStatus;

export type Assignment = BaseModel & {
  status: HomeWorkAsignmentStatus;
  rating?: number;
  deliveredAt?: string;

  homeWorkId: string;

  studentId: string;
};
