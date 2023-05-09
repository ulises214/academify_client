import { FC } from 'react';

import { User } from '../../../domain/user';
import { useUser } from '../../context/user.context';

export const UserChecker: FC<{
  children: (data: { user: User }) => JSX.Element;
  onError?: (error: string) => JSX.Element;
}> = ({ children, onError }) => {
  const { data } = useUser();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data.status) {
    if (onError) {
      return onError(data.payload);
    }

    return (
      <div className='space-y-2 bg-red-100 text-red-500'>
        <span className='block font-medium'>Not logged in</span>
        <span>{data.payload}</span>
      </div>
    );
  }

  return children({ user: data.payload });
};
