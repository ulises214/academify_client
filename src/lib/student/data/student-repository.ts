import { Assignment } from '../../common/domain/models/assignment';
import { CourseWithTeacher } from '../../common/domain/models/course';
import { HomeWork } from '../../common/domain/models/homework';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher({ baseUrl: 'students' });

export type StudentRepository = ParsedRepository<{
  getCourses(): CourseWithTeacher[];
  joinToCourse(courseCode: string): true;
  getCourseDetails(courseId: string): CourseWithTeacher;
  getCourseHomeworks(courseId: string): (HomeWork & {
    asignment: Assignment;
  })[];
}>;

export const StudentApiRepository: StudentRepository = {
  getCourses: () => fetch.get('courses'),
  joinToCourse: (courseCode: string) =>
    fetch.post(`courses/join/${courseCode}`),
  getCourseDetails: (courseId: string) => fetch.get(`courses/${courseId}`),
  getCourseHomeworks: (courseId: string) => fetch.get(`homeworks/${courseId}`),
};
