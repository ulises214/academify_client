import { useParams } from 'react-router-dom';

import { MainButton } from '../../../common/presentation/components/atoms/button/main-button';
import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { CourseHasNotHomework } from '../../../student/presentation/components/course/not-homeworks';
import { CreateHomework } from '../components/organisms/create.homework';
import { TeacherHomeworksList } from '../components/organisms/teacher.homeworks.list';

export const TeacherCourseDetails = () => {
  const id = useParams<{ id: string }>().id;

  if (!id) {
    return (
      <div>
        <h1>Course not found</h1>
      </div>
    );
  }

  return (
    <ApiFetcher allowRetry repo='teacher' action='getCourseHomeWorks' args={id}>
      {({ data, refetch }) => {
        return (
          <div className='space-y-4'>
            <div className='flex justify-end gap-4'>
              <MainButton onClick={refetch}>Actualizar</MainButton>
              <CreateHomework courseId={id} reload={refetch}></CreateHomework>
            </div>
            {!data.homeWorks.length && <CourseHasNotHomework isTeacher />}
            {!!data.homeWorks.length && (
              <TeacherHomeworksList homeworks={data.homeWorks} />
            )}
          </div>
        );
      }}
    </ApiFetcher>
  );
};
