import { FC } from 'react';

import { ApiMethodResult } from '../../../../common/infrastructure/fetch.wrapper';
import { StudentRepository } from '../../../data/student-repository';

export const CourseHomeworksList: FC<{
  data: ApiMethodResult<StudentRepository['getCourseHomeworks']>;
}> = ({ data }) => {
  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {data.map((homework) => (
        <li key={homework.id} className='py-4'>
          <h3 className='text-lg font-medium'>{homework.name}</h3>
        </li>
      ))}
    </ul>
  );
};
