/* eslint-disable no-use-before-define */
import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Assignment,
  HomeWorkAsignmentStatus,
} from '../../../common/domain/models/assignment';
import { getAssignmentStatusLabel } from '../../../common/domain/utils/assignment-labels';
import { getMimeTypeLabel } from '../../../common/domain/utils/get.mimetype.label';
import { MainButton } from '../../../common/presentation/components/atoms/button/main-button';
import { Alert } from '../../../common/presentation/components/molecules/alert';
import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { useFetch } from '../../../common/presentation/hooks/api-fetch';
import { Routes } from '../../../common/presentation/hooks/use-current-path';
import { AddHomeworkFile } from '../components/organisms/add.homework.file';

export const TeacherCourseHomeworkDetails = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  const navigate = useNavigate();

  if (!homeworkId) {
    return <div>Invalid homework id</div>;
  }

  return (
    <ApiFetcher
      allowRetry
      repo='teacher'
      action='getHomeWorkDetails'
      args={homeworkId}
    >
      {({ data, refetch }) => {
        return (
          <section className='space-y-8'>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>{data.name}</h1>
                <MainButton onClick={refetch}>Recargar</MainButton>
              </div>
              <p className='text-gray-500'>{data.description}</p>
              <div>
                <h2 className='text-xl font-bold'>Fecha de entrega</h2>
                <p className='text-gray-500'>
                  {new Date(data.closeAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h2 className='text-xl font-bold'>Estado</h2>
                {data.status === 'CLOSED' && (
                  <ActivateHomework
                    homeworkId={homeworkId}
                    onReload={refetch}
                  />
                )}
                {data.status === 'ACTIVE' && (
                  <Alert variant='success' message={'Esta tarea esta activa'} />
                )}
                {new Date(data.closeAt) < new Date() && (
                  <Alert variant='error' message={'Esta tarea esta cerrada'} />
                )}
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <h2 className='text-xl font-bold'>Archivos adjuntos</h2>
                <AddHomeworkFile
                  {...{
                    onReload: refetch,
                    courseId: data.courseId,
                    homeworkId: data.id,
                  }}
                />
              </div>
              <ul className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
                {data.files.map((file) => (
                  <li
                    key={file.id}
                    className='flex flex-col border border-slate-200'
                  >
                    <span className='text-lg font-bold'>{file.name}</span>
                    <span className='text-gray-500'>
                      {getMimeTypeLabel(file.type)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <h2 className='text-xl font-bold'>Asignaciones</h2>
                {data.status !== 'CLOSED' && (
                  <MainButton
                    onClick={() => {
                      navigate(
                        Routes.TEACHER_HOMEWORK_ASSESSMENTS.replace(
                          ':courseId',
                          data.courseId
                        ).replace(':homeworkId', data.id)
                      );
                    }}
                  >
                    Calificar asignaciones
                  </MainButton>
                )}
              </div>
              <Assignments assignments={data.asignments} />
            </div>
          </section>
        );
      }}
    </ApiFetcher>
  );
};

const ActivateHomework: FC<{ homeworkId: string; onReload: VoidFunction }> = ({
  homeworkId,
  onReload,
}) => {
  const { refetch, result } = useFetch({
    repo: 'teacher',
    action: 'activateHomeWork',
    args: homeworkId,
  });

  useEffect(() => {
    if (result.data) {
      onReload();
    }
  }, [onReload, result]);

  return (
    <Alert
      variant='warning'
      onClick={refetch}
      isLoading={result.loading}
      message={'Esta tarea no ha sido activada haz click para activarla'}
    />
  );
};

const Assignments: FC<{ assignments: Assignment[] }> = ({ assignments }) => {
  const parsed = assignments.reduce(
    (acc, assignment) => {
      acc[assignment.status] = acc[assignment.status] + 1;

      return acc;
    },
    {
      DELIVERED: 0,
      DELIVERED_LATE: 0,
      EVALUATED: 0,
      UNDELIVERED: 0,
    } as Record<HomeWorkAsignmentStatus, number>
  );

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {Object.entries(parsed).map(([key, value]) => (
        <div key={key}>
          <h3 className='text-lg font-bold'>
            {getAssignmentStatusLabel(key as HomeWorkAsignmentStatus)}
          </h3>
          <p className='text-2xl font-bold'>{value}</p>
          <p className='text-gray-500'>Asignaciones</p>
        </div>
      ))}
    </div>
  );
};
