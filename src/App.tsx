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
import { StudentHomePage } from './lib/student/presentation/pages/student.home.page';
import { TeacherHomePage } from './lib/teacher/presentation/pages/teacher.home.page';
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
    <BrowserRouter basename='client'>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/student'
            element={<RoleProtectedRoute role='STUDENT' />}
          >
            <Route index element={<StudentHomePage user={userInfo} />} />
            <Route path='*' element={<div>Student</div>} />
          </Route>
          <Route
            path='/teacher'
            element={<RoleProtectedRoute role='TEACHER' />}
          >
            <Route index element={<TeacherHomePage user={userInfo} />} />
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
