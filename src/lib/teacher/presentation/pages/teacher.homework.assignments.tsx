/* eslint-disable no-use-before-define */
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Assignment } from '../../../common/domain/models/assignment';
import { AppFile } from '../../../common/domain/models/file';
import { getAssignmentStatusLabel } from '../../../common/domain/utils/assignment-labels';
import { clsxm } from '../../../common/presentation/clsxm';
import { MainButton } from '../../../common/presentation/components/atoms/button/main-button';
import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { ModalWrapper } from '../../../common/presentation/components/molecules/modals/modal-wrapper';
import { User } from '../../../user/domain/user';
import { AssignmentDetails } from '../components/organisms/assigment-details';

export const TeacherHomeworkAssignments = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const [currentAssignment, setCurrentAssignment] = useState<
    Assignment & {
      files: AppFile[];
      user?: User | undefined;
    }
  >();
  if (!homeworkId) {
    return <></>;
  }

  return (
    <ApiFetcher
      repo='teacher'
      action='getHomeWorkAssignments'
      args={homeworkId}
    >
      {({ data, refetch }) => {
        return (
          <>
            <AssignmentDetailsModal
              onReload={refetch}
              onClose={() => {
                setCurrentAssignment(undefined);
              }}
              assignment={currentAssignment}
            />
            <section className='space-y-8'>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>{data.name}</h1>
                <MainButton onClick={refetch}>Recargar</MainButton>
              </div>
              <div className='space-y-4'>
                <h2 className='text-xl font-bold'>Asignaciones</h2>
                <ul className='space-y-4'>
                  {data.assignments.map((assignment) => {
                    const { user } = assignment;

                    return (
                      <li key={assignment.id} className='space-y-2'>
                        <div className='flex justify-between'>
                          <div>
                            <h3 className='text-lg font-bold'>{user?.name}</h3>
                            <p className='text-gray-500'>{user?.email}</p>
                            <span
                              className={clsxm(
                                'py-1 px-2 rounded-full text-white',
                                assignment.status === 'UNDELIVERED' &&
                                  'bg-slate-500',
                                assignment.status === 'DELIVERED' &&
                                  'bg-green-500',
                                assignment.status === 'DELIVERED_LATE' &&
                                  'bg-amber-500',
                                assignment.status === 'EVALUATED' &&
                                  'bg-sky-500'
                              )}
                            >
                              {getAssignmentStatusLabel(assignment.status)}
                            </span>
                          </div>
                          <div>
                            <MainButton
                              onClick={() => {
                                setCurrentAssignment(assignment);
                              }}
                            >
                              Ver
                            </MainButton>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          </>
        );
      }}
    </ApiFetcher>
  );
};

const AssignmentDetailsModal: FC<{
  assignment?: Assignment & {
    files: AppFile[];
    user?: User | undefined;
  };
  onClose: VoidFunction;
  onReload: VoidFunction;
}> = ({ assignment, onClose, onReload }) => {
  return (
    <ModalWrapper open={!!assignment} onClose={onClose}>
      {assignment && (
        <AssignmentDetails
          onReload={onReload}
          onClose={onClose}
          assignment={assignment}
        />
      )}
    </ModalWrapper>
  );
};
