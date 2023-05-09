import { createContext, useContext } from 'react';

import { ApiResult } from '../../../common/infrastructure/fetch.wrapper';
import { User } from '../../domain/user';

export interface UserContext {
  data?: ApiResult<User>;
}

export const userContext = createContext<UserContext>({} as UserContext);

export const useUser = () => {
  const user = useContext(userContext) as UserContext | undefined;

  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return user;
};
