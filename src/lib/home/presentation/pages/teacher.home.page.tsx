import { FC } from 'react';

import { User } from '../../../user/domain/user';

export const TeacherHomePage: FC<{ user: User }> = ({ user }) => {
  return <>{user.displayName}</>;
};
