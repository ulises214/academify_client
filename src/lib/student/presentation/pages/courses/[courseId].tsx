import { useParams } from 'react-router-dom';

import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { ApiFetcher } from '../../../../common/presentation/components/molecules/api-fetcher';
import { CourseHasNotHomework } from '../../components/course/not-homeworks';
import { CourseHomeworksList } from '../../components/organisms/course-homeworks-list';

export const StudentCourseDetails = () => {
  const id = useParams<{ id: string }>().id;

  if (!id) {
    return (
      <div>
        <h1>Course not found</h1>
      </div>
    );
  }

  return (
    <>
      <ApiFetcher repo='student' action='getCourseDetails' args={id}>
        {({ data }) => {
          return <>{data.name}</>;
        }}
      </ApiFetcher>
      <ApiFetcher repo='student' action='getCourseHomeworks' args={id}>
        {({ data, refetch }) => {
          return (
            <div className='space-y-4'>
              <div className='flex justify-end'>
                <MainButton onClick={refetch}>Actualizar </MainButton>
              </div>
              {!data.length && <CourseHasNotHomework />}
              {!!data.length && <CourseHomeworksList data={data} />}
            </div>
          );
        }}
      </ApiFetcher>
    </>
  );
};
