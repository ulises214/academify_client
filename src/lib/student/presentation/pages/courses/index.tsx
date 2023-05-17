import { useNavigate } from 'react-router-dom';

import { clsxm } from '../../../../common/presentation/clsxm';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { ApiFetcher } from '../../../../common/presentation/components/molecules/api-fetcher';
import { StudentCourseCard } from '../../components/course/course-card';
import { NotJoinedToCourse } from '../../components/molecules/not-joined-to-course';
import { JoinToCourse } from '../../components/organisms/join-to-course';

export const StudentCoursesList = () => {
  const navigate = useNavigate();

  return (
    <ApiFetcher
      onError={{
        alertMessage: 'Error',
        canRefetch: true,
      }}
      onLoading={() => {
        return (
          <div className='flex justify-center'>
            <Loader />
          </div>
        );
      }}
      repo='student'
      action='getCourses'
    >
      {({ data, refetch }) => {
        return (
          <div className='space-y-4'>
            <div className='flex justify-end'>
              <JoinToCourse reload={refetch} />
            </div>
            {!!data.length && (
              <ul
                className={clsxm(
                  'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
                  'gap-4'
                )}
              >
                {data.map((course) => {
                  return (
                    <StudentCourseCard
                      key={course.id}
                      onClick={() => {
                        navigate(`/student/course/${course.id}`);
                      }}
                      course={course}
                    ></StudentCourseCard>
                  );
                })}
              </ul>
            )}
            {!data.length && <NotJoinedToCourse />}
          </div>
        );
      }}
    </ApiFetcher>
  );
};
