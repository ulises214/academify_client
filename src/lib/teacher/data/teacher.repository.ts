import { Course } from '../../common/domain/models/course';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher({ baseUrl: 'teacher' });

export type TeacherRepository = ParsedRepository<{
  getCourses(): Course[];
}>;

export const TeacherApiRepository: TeacherRepository = {
  getCourses: () => fetch.get('courses'),
};
