import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { ApiResult } from '../../../common/infrastructure/fetch.wrapper';
import { UserApiRepository } from '../../application/user.repository';
import { User } from '../../domain/user';
import { userContext } from './user.context';

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<ApiResult<User>>();

  useEffect(() => {
    UserApiRepository.getProfile().then(setUser).catch(console.error);
  }, []);

  return (
    <userContext.Provider value={{ data: user }}>
      {children}
    </userContext.Provider>
  );
};
