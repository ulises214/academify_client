import { FC } from 'react';

import { Assignment } from '../../../../common/domain/models/assignment';
import { AppFile } from '../../../../common/domain/models/file';
import { getAssignmentStatusLabel } from '../../../../common/domain/utils/assignment-labels';
import { clsxm } from '../../../../common/presentation/clsxm';
import { User } from '../../../../user/domain/user';

export const AssignmentDetails: FC<{
  assignment: Assignment & {
    files: AppFile[];
    user?: User | undefined;
  };
  onReload: VoidFunction;
  onClose: VoidFunction;
}> = ({ onClose, assignment, onReload }) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-xs text-gray-500'>
          Entregado el{' '}
          {new Date(assignment.deliveredAt ?? new Date()).toLocaleDateString()}
        </p>
        <span
          className={clsxm(
            'py-1 px-2 rounded-full text-white text-xs',
            assignment.status === 'UNDELIVERED' && 'bg-slate-500',
            assignment.status === 'DELIVERED' && 'bg-green-500',
            assignment.status === 'DELIVERED_LATE' && 'bg-amber-500',
            assignment.status === 'EVALUATED' && 'bg-sky-500'
          )}
        >
          {getAssignmentStatusLabel(assignment.status)}
        </span>
      </div>
      <div>
        <h3 className='text-sm'>{assignment.user?.name}</h3>
        <p className='text-sm'>{assignment.user?.email}</p>
      </div>
    </div>
  );
};
