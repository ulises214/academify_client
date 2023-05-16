import { CourseWithTeacher } from '../../common/domain/models/course';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher({ baseUrl: 'students' });

export type StudentRepository = ParsedRepository<{
  getCourses(): CourseWithTeacher[];
}>;

export const StudentApiRepository: StudentRepository = {
  getCourses: () => fetch.get('courses'),
};
