/* eslint-disable no-use-before-define */
import { FC, useEffect, useState } from 'react';

import { Assignment } from '../../../../common/domain/models/assignment';
import { AppFile } from '../../../../common/domain/models/file';
import { getAssignmentStatusLabel } from '../../../../common/domain/utils/assignment-labels';
import { getErrorMessage } from '../../../../common/domain/utils/get-error-message';
import { clsxm } from '../../../../common/presentation/clsxm';
import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import { AppFileViewer } from '../../../../common/presentation/components/molecules/file/app.file.viewer';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';
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
      <div>
        <h3 className='text-sm'>Archivos</h3>
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
          {assignment.files.map((file) => (
            <AppFileViewer key={file.id} file={file} type='assignment' />
          ))}
        </ul>
      </div>
      {assignment.status === 'EVALUATED' && (
        <div>
          <h3 className='text-sm'>Calificación</h3>
          <p className='text-sm'>{assignment.rating}</p>
        </div>
      )}
      {(assignment.status === 'DELIVERED' ||
        assignment.status === 'DELIVERED_LATE') && (
        <RateAssignment
          assignmentId={assignment.id}
          onReload={() => {
            onReload();
            onClose();
          }}
        ></RateAssignment>
      )}
    </div>
  );
};

const RateAssignment: FC<{
  onReload: VoidFunction;
  assignmentId: string;
}> = ({ assignmentId, onReload }) => {
  const [rate, setRate] = useState(0);
  const { refetch, result } = useFetch({
    action: 'rateAssignment',
    repo: 'teacher',
  });

  useEffect(() => {
    if (result.data) {
      onReload();
    }
  }, [onReload, result]);

  return (
    <>
      {result.error && (
        <Alert variant='error' message={getErrorMessage(result.error)}></Alert>
      )}
      <div className='flex items-end  gap-4'>
        <div className='grow'>
          <InputWithLabel
            label='Calificación'
            type='number'
            min={0}
            max={10}
            step={0.1}
            value={rate}
            onChange={(e) => {
              const value = e.target.value;
              setRate(Number(value) || 0);
            }}
          />
        </div>
        <div>
          <MainButton
            isLoading={result.loading}
            onClick={() => {
              refetch({ assignmentId, rate });
            }}
          >
            Evaluar
          </MainButton>
        </div>
      </div>
    </>
  );
};
