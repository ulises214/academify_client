import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { HomeWork } from '../../../../common/domain/models/homework';
import { clsxm } from '../../../../common/presentation/clsxm';
import { Routes } from '../../../../common/presentation/hooks/use-current-path';

export const TeacherHomeworksList: FC<{
  homeworks: HomeWork[];
}> = ({ homeworks }) => {
  const navigate = useNavigate();

  return (
    <ul className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
      {homeworks.map((homework) => {
        return (
          <li
            key={homework.id}
            className={clsxm('py-4', 'cursor-pointer', 'hover:bg-gray-100')}
            onClick={() =>
              navigate(
                Routes.TEACHER_HOMEWORK_DETAILS.replace(
                  ':courseId',
                  homework.courseId
                ).replace(':homeworkId', homework.id)
              )
            }
          >
            <h3 className='text-lg font-medium'>{homework.name}</h3>
          </li>
        );
      })}
    </ul>
  );
};
