import { Assignment } from '../../common/domain/models/assignment';
import { Course } from '../../common/domain/models/course';
import { AppFile } from '../../common/domain/models/file';
import { HomeWork } from '../../common/domain/models/homework';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';
import { User } from '../../user/domain/user';

const fetch = buildFetcher('teachers');

export type TeacherRepository = ParsedRepository<{
  getCourses(): Course[];
  createCourse(arg0: {
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
  }): Course;
  getCourseHomeWorks(courseId: string): Course & {
    homeWorks: HomeWork[];
  };
  createHomeWork(arg0: {
    name: string;
    description: string;
    closeAt: string;
    courseId: string;
  }): HomeWork;
  getHomeWorkDetails(homeworkId: string): HomeWork & {
    asignments: Assignment[];
    files: AppFile[];
  };
  getHomeWorkAssignments(homeworkId: string): HomeWork & {
    assignments: (Assignment & {
      files: AppFile[];
      user?: User;
    })[];
  };
  activateHomeWork(homeworkId: string): true;
}>;

export const TeacherApiRepository: TeacherRepository = {
  getCourses: () => fetch.get('courses'),
  createCourse: (body) => fetch.post('courses', { body }),
  getCourseHomeWorks: (courseId) => fetch.get(`homeworks/course/${courseId}`),
  createHomeWork: (body) => fetch.post('homeworks', { body }),
  getHomeWorkDetails: (homeworkId) => fetch.get(`homeworks/${homeworkId}`),
  getHomeWorkAssignments: (homeworkId) =>
    fetch.get(`homeworks/${homeworkId}/assignments`),
  activateHomeWork: (homeworkId) =>
    fetch.post(`homeworks/${homeworkId}/activate`),
};
