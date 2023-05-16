import { FC } from 'react';

import { LoginUser } from '../../../user/domain/user';
import { StudentCoursesList } from './courses';

export const StudentHomePage: FC<{ user: LoginUser }> = () => {
  return (
    <div className='w-full'>
      <StudentCoursesList />
    </div>
  );
};
