import { Assignment } from '../../common/domain/models/assignment';
import { CourseWithTeacher } from '../../common/domain/models/course';
import { AppFile } from '../../common/domain/models/file';
import { HomeWork } from '../../common/domain/models/homework';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher('students');

export type StudentRepository = ParsedRepository<{
  getCourses(): CourseWithTeacher[];
  joinToCourse(courseCode: string): true;
  getCourseDetails(courseId: string): CourseWithTeacher;
  deliverHomework(homeworkId: string): true;
  getCourseHomeworks(courseId: string): (HomeWork & {
    asignment: Assignment;
  })[];
  getHomeworkDetails(homeworkId: string): HomeWork & {
    files: AppFile[];
    asignment: Assignment & {
      files: AppFile[];
    };
  };
}>;

export const StudentApiRepository: StudentRepository = {
  getCourses: () => fetch.get('courses'),
  joinToCourse: (courseCode: string) =>
    fetch.post(`courses/join/${courseCode}`),
  getCourseDetails: (courseId: string) => fetch.get(`courses/${courseId}`),
  getCourseHomeworks: (courseId: string) =>
    fetch.get(`homeworks/course/${courseId}`),
  getHomeworkDetails: (homeworkId: string) =>
    fetch.get(`homeworks/${homeworkId}`),
  deliverHomework: (homeworkId: string) =>
    fetch.post(`homeworks/${homeworkId}/deliver`),
};
