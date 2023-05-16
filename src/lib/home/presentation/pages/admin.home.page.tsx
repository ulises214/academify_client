import { FC } from 'react';

import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { LoginUser } from '../../../user/domain/user';

export const AdminHomePage: FC<{ user: LoginUser }> = ({ user }) => {
  return (
    <ApiFetcher repo='statistics' action='getCounts'>
      {({ data: { courses, students, teachers } }) => {
        return (
          <div className='flex flex-col space-y-4'>
            {user.displayName}
            <div className='flex flex-col space-y-2'>
              <span className='font-medium'>Total courses</span>
              <span>{courses}</span>
            </div>
            <div className='flex flex-col space-y-2'>
              <span className='font-medium'>Total students</span>
              <span>{students}</span>
            </div>
            <div className='flex flex-col space-y-2'>
              <span className='font-medium'>Total teachers</span>
              <span>{teachers}</span>
            </div>
          </div>
        );
      }}
    </ApiFetcher>
  );
};
