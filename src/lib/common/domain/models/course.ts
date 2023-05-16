import { User } from '../../../user/domain/user';
import { BaseModel } from './base-model';

enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export type Course = BaseModel & {
  name: string;
  description: string;

  teacherId: string;

  status: CourseStatus;
};

export type CourseWithTeacher = Course & {
  teacher?: Pick<User, 'name'>;
};

export type CourseWithTeacherAndSubscription = CourseWithTeacher & {
  subscription: BaseModel;
};
