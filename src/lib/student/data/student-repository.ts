import { CourseWithTeacher } from '../../common/domain/models/course';
import {
  ApiResponse,
  buildFetcher,
} from '../../common/infrastructure/fetch.wrapper';

export type StudentRepository = {
  getCourses(): ApiResponse<CourseWithTeacher[]>;
};

const fetch = buildFetcher({
  baseUrl: 'students',
  withApi: true,
});

export const StudentApiRepository: StudentRepository = {
  getCourses: () => fetch.get({ path: '/courses' }),
};
