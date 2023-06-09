import { FC, PropsWithChildren } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useOutlet,
} from 'react-router-dom';

import { MainLayout } from './lib/common/presentation/layout/main.layout';
import { AdminHomePage } from './lib/home/presentation/pages/admin.home.page';
import { HomePage } from './lib/home/presentation/pages/home.page';
import { StudentCourseDetails } from './lib/student/presentation/pages/courses/[courseId]';
import { StudentHomePage } from './lib/student/presentation/pages/student.home.page';
import { StudentHomeworkDetails } from './lib/student/presentation/pages/student.homework.details';
import { TeacherCourseDetails } from './lib/teacher/presentation/pages/teacher.course.details';
import { TeacherCourseHomeworkDetails } from './lib/teacher/presentation/pages/teacher.course.homework.details';
import { TeacherHomePage } from './lib/teacher/presentation/pages/teacher.home.page';
import { TeacherHomeworkAssignments } from './lib/teacher/presentation/pages/teacher.homework.assignments';
import { UserRole } from './lib/user/domain/user';
import { useUser } from './lib/user/presentation/context/user.context';
import { LoadingUser } from './lib/user/presentation/pages/loading-user';
import { NotLogged } from './lib/user/presentation/pages/not-logged';

const RoleProtectedRoute: FC<PropsWithChildren<{ role: UserRole }>> = ({
  role,
  children,
}) => {
  const user = useUser();
  const outlet = useOutlet();

  if (!user.data?.status) {
    return <Navigate to='/' />;
  }

  if (user.data.payload.role !== role) {
    return <Navigate to={`/${user.data.payload.role.toLowerCase()}`} />;
  }

  return outlet ?? <>{children}</>;
};

function App() {
  const user = useUser();

  if (!user.data) {
    return <LoadingUser />;
  }

  if (!user.data.status) {
    return <NotLogged />;
  }

  const userInfo = user.data.payload;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/student'
            element={<RoleProtectedRoute role='STUDENT' />}
          >
            <Route index element={<StudentHomePage user={userInfo} />} />
            <Route path='course/:id'>
              <Route index element={<StudentCourseDetails />} />
              <Route path='homework/:homeworkId'>
                <Route index element={<StudentHomeworkDetails />} />
              </Route>
            </Route>

            <Route path='*' element={<div>Student</div>} />
          </Route>
          <Route
            path='/teacher'
            element={<RoleProtectedRoute role='TEACHER' />}
          >
            <Route index element={<TeacherHomePage user={userInfo} />} />
            <Route path='course/:id'>
              <Route index element={<TeacherCourseDetails />} />
              <Route path='homework/:homeworkId'>
                <Route index element={<TeacherCourseHomeworkDetails />} />
                <Route
                  path='assignments'
                  element={<TeacherHomeworkAssignments />}
                />
                <Route path='*' element={<div>Homework</div>} />
              </Route>
            </Route>
            <Route path='*' element={<div>Teacher</div>} />
          </Route>
          <Route path='/admin' element={<RoleProtectedRoute role='ADMIN' />}>
            <Route index element={<AdminHomePage user={userInfo} />} />
            <Route path='*' element={<div>Admin</div>} />
          </Route>
          <Route path='/profile'>
            <Route path='*' element={<div>Profile</div>} />
          </Route>
          <Route path='*' element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
