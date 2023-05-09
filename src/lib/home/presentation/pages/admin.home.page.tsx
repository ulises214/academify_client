import { FC, useEffect, useState } from 'react';

import { User } from '../../../user/domain/user';
import {
  StatisticsApiRepository,
  StatisticsRepository,
} from '../../application/statistics.repository';

export const AdminHomePage: FC<{ user: User }> = ({ user }) => {
  const [statistics, setStatistics] =
    useState<Awaited<ReturnType<StatisticsRepository['getCounts']>>>();

  useEffect(() => {
    StatisticsApiRepository.getCounts()
      .then(setStatistics)
      .catch(console.error);
  }, []);

  if (!statistics) {
    return <div>Loading...</div>;
  }

  if (!statistics.status) {
    return <div>Error - {statistics.payload}</div>;
  }

  return (
    <div className='flex flex-col space-y-4'>
      {user.displayName}
      <div className='flex flex-col space-y-2'>
        <span className='font-medium'>Total courses</span>
        <span>{statistics.payload.courses}</span>
      </div>
      <div className='flex flex-col space-y-2'>
        <span className='font-medium'>Total students</span>
        <span>{statistics.payload.students}</span>
      </div>
      <div className='flex flex-col space-y-2'>
        <span className='font-medium'>Total teachers</span>
        <span>{statistics.payload.teachers}</span>
      </div>
    </div>
  );
};
