import { FC } from 'react';

import { Course } from '../../../../common/domain/models/course';
import { clsxm } from '../../../../common/presentation/clsxm';
import { StudentCourseCard } from '../../../../student/presentation/components/course/course-card';
import { useUser } from '../../../../user/presentation/context/user.context';

export const TeacherCoursesList: FC<{ courses: Course[] }> = ({ courses }) => {
  const user = useUser();

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
            course={{
              ...course,
              teacher: user.data?.status
                ? {
                    name: user.data.payload.displayName,
                  }
                : undefined,
            }}
          ></StudentCourseCard>
        );
      })}
    </ul>
  );
};
