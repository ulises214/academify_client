import { FC } from 'react';

import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { LoginUser } from '../../../domain/user';
import { useUser } from '../../context/user.context';

export const UserChecker: FC<{
  children: (data: { user: LoginUser }) => JSX.Element;
  onError?: (error: string) => JSX.Element;
}> = ({ children, onError }) => {
  const { data } = useUser();

  if (!data) {
    return <Loader className='mx-auto' />;
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
