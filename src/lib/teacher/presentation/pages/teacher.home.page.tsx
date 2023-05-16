import { FC } from 'react';

import { LoginUser } from '../../../user/domain/user';

export const TeacherHomePage: FC<{ user: LoginUser }> = ({ user }) => {
  return <>{user.displayName}</>;
};
