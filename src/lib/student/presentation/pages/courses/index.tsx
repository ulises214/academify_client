import { clsxm } from '../../../../common/presentation/clsxm';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { ApiFetcher } from '../../../../common/presentation/components/molecules/api-fetcher';
import { StudentCourseCard } from '../../components/course/course-card';

export const StudentCoursesList = () => {
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
      {({ data }) => {
        return (
          <ul
            className={clsxm(
              'grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
              'gap-4'
            )}
          >
            {data.map((course) => {
              return <StudentCourseCard course={course}></StudentCourseCard>;
            })}
          </ul>
        );
      }}
    </ApiFetcher>
  );
};
