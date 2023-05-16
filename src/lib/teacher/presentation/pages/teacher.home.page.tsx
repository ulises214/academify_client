import { FC } from 'react';

import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { LoginUser } from '../../../user/domain/user';
import { NotOwnsCourses } from '../components/molecules/not-courses';
import { TeacherCoursesList } from '../components/molecules/teacher-courses-list';
import { CreateCourseForm } from '../components/organisms/create-course-form';

export const TeacherHomePage: FC<{ user: LoginUser }> = ({ user }) => {
  return (
    <div className='space-y-4'>
      {user.displayName}
      <ApiFetcher repo='teacher' action='getCourses'>
        {({ data, refetch }) => {
          return (
            <div className='space-y-4'>
              <div className='flex justify-end'>
                <CreateCourseForm reload={refetch} />
              </div>
              {!!data.length && <TeacherCoursesList courses={data} />}
              {!data.length && <NotOwnsCourses />}
            </div>
          );
        }}
      </ApiFetcher>
    </div>
  );
};
