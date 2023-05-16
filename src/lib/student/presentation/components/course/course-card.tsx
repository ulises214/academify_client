import { FC } from 'react';

import { CourseWithTeacher } from '../../../../common/domain/models/course';
import { clsxm } from '../../../../common/presentation/clsxm';

export const StudentCourseCard: FC<{ course: CourseWithTeacher }> = ({
  course,
}) => {
  return (
    <li>
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <div className='flex items-start justify-between'>
          <h2 className='mb-4 text-2xl font-bold'>{course.name}</h2>
          <span className='text-md'>#{course.code}</span>
        </div>
        <p className='mb-4 text-gray-600'>{course.description}</p>
        {course.teacher && (
          <div className='flex items-center'>
            <span className='mr-2 font-medium text-gray-800'>Profesor:</span>
            <span className='text-gray-600'>{course.teacher.name}</span>
          </div>
        )}
        <div className='mt-4 flex items-center justify-between'>
          <span className='mr-2 font-medium text-gray-800'>Estado:</span>
          <span className='text-gray-600'>
            <div
              className={clsxm(
                'inline-block mr-2',
                'w-3 h-3',
                'rounded-full',
                course.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
              )}
            ></div>
            {course.status === 'ACTIVE' ? 'ACTIVO' : 'CERRADO'}
          </span>
        </div>
      </div>
    </li>
  );
};
