import { matchRoutes, useLocation } from 'react-router-dom';

export const Routes = {
  HOME: '/',
  STUDENT_HOME: '/student',
  STUDENT_COURSE_DETAILS: '/student/course/:id',
  STUDENT_ACTIVITIES: '/student/activities',
  STUDENT_GRADES: '/student/grades',
  TEACHER_HOME: '/teacher',
  TEACHER_COURSE_DETAILS: '/teacher/course/:id',
  TEACHER_HOMEWORK_DETAILS: '/teacher/course/:courseId/homework/:homeworkId',
  TEACHER_HOMEWORK_ASSESSMENTS:
    '/teacher/course/:courseId/homework/:homeworkId/assignments',
  TEACHER_ACTIVITIES: '/teacher/activities',
  TEACHER_GRADES: '/teacher/grades',
  ADMIN_HOME: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_CLASES: '/admin/classes',
  USER_PROFILE: '/profile',
  USER_SETTINGS: '/profile/settings',
};

const routes: { path: string }[] = Object.values(Routes).map((path) => ({
  path,
}));

export const useCurrentPath = (): string | undefined => {
  const location = useLocation();
  const result = matchRoutes(routes, location);
  if (!result) {
    return;
  }
  const { path } = result[0].route;

  return path;
};
