import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiMethodResult } from '../../../../common/infrastructure/fetch.wrapper';
import { clsxm } from '../../../../common/presentation/clsxm';
import { Routes } from '../../../../common/presentation/hooks/use-current-path';
import { StudentRepository } from '../../../data/student-repository';

export const CourseHomeworksList: FC<{
  data: ApiMethodResult<StudentRepository['getCourseHomeworks']>;
}> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <ul role='list' className={clsxm('divide-y divide-gray-200')}>
      {data.map((homework) => (
        <li
          key={homework.id}
          className={clsxm('py-4', 'hover:bg-gray-100')}
          onClick={() => {
            navigate(
              Routes.STUDENT_HOMEWORK_DETAILS.replace(
                ':courseId',
                homework.courseId
              ).replace(':homeworkId', homework.id)
            );
          }}
        >
          <h3 className='text-lg font-medium'>{homework.name}</h3>
        </li>
      ))}
    </ul>
  );
};
