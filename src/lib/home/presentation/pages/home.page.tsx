import { Navigate } from 'react-router-dom';

import { UserChecker } from '../../../user/presentation/components/organisms/user.checker';

export const HomePage = () => {
  return (
    <UserChecker>
      {({ user }) => {
        return <Navigate to={`/${user.role.toLowerCase()}`} />;
      }}
    </UserChecker>
  );
};
