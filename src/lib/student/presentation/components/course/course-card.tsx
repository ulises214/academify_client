import { FC } from 'react';

import { CourseWithTeacher } from '../../../../common/domain/models/course';

export const StudentCourseCard: FC<{ course: CourseWithTeacher }> = ({
  course,
}) => {
  return (
    <li>
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold'>{course.name}</h2>
        <p className='mb-4 text-gray-600'>{course.description}</p>
        {course.teacher && (
          <div className='flex items-center'>
            <span className='mr-2 font-medium text-gray-800'>Teacher:</span>
            <span className='text-gray-600'>{course.teacher.name}</span>
          </div>
        )}
        <div className='mt-4 flex items-center'>
          <span className='mr-2 font-medium text-gray-800'>Status:</span>
          <span className='text-gray-600'>{course.status}</span>
        </div>
      </div>
    </li>
  );
};
