import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Course } from '../../../../common/domain/models/course';
import { clsxm } from '../../../../common/presentation/clsxm';
import { Routes } from '../../../../common/presentation/hooks/use-current-path';
import { StudentCourseCard } from '../../../../student/presentation/components/course/course-card';

export const TeacherCoursesList: FC<{ courses: Course[] }> = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <ul
      className={clsxm(
        'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
        'gap-4'
      )}
    >
      {courses.map((course) => {
        return (
          <StudentCourseCard
            key={course.id}
            onClick={() =>
              navigate(Routes.TEACHER_COURSE_DETAILS.replace(':id', course.id))
            }
            course={course}
          ></StudentCourseCard>
        );
      })}
    </ul>
  );
};
