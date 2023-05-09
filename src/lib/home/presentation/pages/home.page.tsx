import { UserChecker } from '../../../user/presentation/components/organisms/user.checker';
import { AdminHomePage } from './admin.home.page';
import { StudentHomePage } from './student.home.page';
import { TeacherHomePage } from './teacher.home.page';

export const HomePage = () => {
  return (
    <UserChecker>
      {({ user }) => {
        if (user.role === 'ADMIN') {
          return <AdminHomePage user={user} />;
        }
        if (user.role === 'TEACHER') {
          return <TeacherHomePage user={user} />;
        }

        return <StudentHomePage user={user} />;
      }}
    </UserChecker>
  );
};
