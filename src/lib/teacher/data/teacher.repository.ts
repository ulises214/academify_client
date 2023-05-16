import { Course } from '../../common/domain/models/course';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher({ baseUrl: 'teachers' });

export type TeacherRepository = ParsedRepository<{
  getCourses(): Course[];
  createCourse(arg0: {
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
  }): Course;
}>;

export const TeacherApiRepository: TeacherRepository = {
  getCourses: () => fetch.get('courses'),
  createCourse: (body) => fetch.post('courses', { body }),
};
