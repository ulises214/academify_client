import { BaseModel } from './base-model';

export type AppFile = BaseModel & {
  name: string;
  path: string;
  size: string;
  type: string;

  homeWorkId?: string;

  homeWorkAsignmentId?: string;
};
