import { createContext, useContext } from 'react';

import { ApiResult } from '../../../common/infrastructure/fetch.wrapper';
import { LoginUser } from '../../domain/user';

export interface UserContext {
  data?: ApiResult<LoginUser>;
}

export const userContext = createContext<UserContext>({} as UserContext);

export const useUser = () => {
  const user = useContext(userContext) as UserContext | undefined;

  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return user;
};
