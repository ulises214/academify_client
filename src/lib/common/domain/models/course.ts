import { User } from '../../../user/domain/user';
import { BaseModel } from './base-model';

const CourseStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export type CourseStatus = keyof typeof CourseStatus;

export type Course = BaseModel & {
  name: string;
  description: string;
  code: string;
  teacherId: string;

  status: CourseStatus;
};

export type CourseWithTeacher = Course & {
  teacher?: Pick<User, 'name'>;
};

export type CourseWithTeacherAndSubscription = CourseWithTeacher & {
  subscription: BaseModel;
};
