/* eslint-disable no-use-before-define */
import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAssignmentStatusLabel } from '../../../common/domain/utils/assignment-labels';
import { getMimeTypeLabel } from '../../../common/domain/utils/get.mimetype.label';
import { clsxm } from '../../../common/presentation/clsxm';
import { MainButton } from '../../../common/presentation/components/atoms/button/main-button';
import { Loader } from '../../../common/presentation/components/atoms/loader';
import { Alert } from '../../../common/presentation/components/molecules/alert';
import { ApiFetcher } from '../../../common/presentation/components/molecules/api-fetcher';
import { InputWithLabel } from '../../../common/presentation/components/molecules/input/input-with-label';
import { ModalWrapper } from '../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../common/presentation/hooks/api-fetch';

export const StudentHomeworkDetails = () => {
  const { homeworkId } = useParams<{ homeworkId: string }>();
  if (!homeworkId) {
    return (
      <div>
        <h1>Homework not found</h1>
      </div>
    );
  }

  return (
    <ApiFetcher
      allowRetry
      repo='student'
      action='getHomeworkDetails'
      args={homeworkId}
    >
      {({ data, refetch }) => {
        return (
          <div className='space-y-4'>
            <div className='flex justify-end'>
              <MainButton onClick={refetch}>Actualizar</MainButton>
            </div>
            <section className='flex w-full flex-col gap-4 xl:flex-row xl:gap-8'>
              <div className='flex-1 space-y-4'>
                <div className='flex justify-between'>
                  <div>
                    <h1 className='text-2xl font-bold'>{data.name}</h1>
                    <p className='text-gray-500'>{data.description}</p>
                  </div>
                  <div>
                    <span
                      className={clsxm(
                        'py-1 px-3 rounded-full text-white',
                        data.status === 'CLOSED' && 'bg-red-500',
                        data.status === 'ACTIVE' && 'bg-green-500',
                        new Date(data.closeAt) < new Date() && 'bg-amber-500'
                      )}
                    >
                      {data.status === 'CLOSED' && 'Cerrada'}
                      {data.status === 'ACTIVE' && 'Activa'}
                      {new Date(data.closeAt) < new Date() && 'Finalizada'}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Fecha de entrega</h2>
                  <p className='text-gray-500'>
                    {new Date(data.closeAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Archivos adjuntos</h2>
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
              </div>
              <div className='flex-1 space-y-4'>
                <div className='flex justify-between'>
                  <h2 className='text-xl font-bold'>Tu asignación</h2>
                  {getAssignmentStatusLabel(data.asignment.status)}
                </div>
                <div>
                  <h2 className='text-xl font-bold'>Archivos adjuntos</h2>
                  <ul className='mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
                    {data.asignment.files.map((file) => (
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
                {data.asignment.status === 'UNDELIVERED' && (
                  <>
                    <AddFile homeworkId={homeworkId} onReload={refetch} />
                    <SetAsDelivered
                      onReload={refetch}
                      homeworkId={homeworkId}
                    ></SetAsDelivered>
                  </>
                )}
              </div>
            </section>
          </div>
        );
      }}
    </ApiFetcher>
  );
};

const SetAsDelivered: FC<{
  homeworkId: string;
  onReload: VoidFunction;
}> = ({ homeworkId, onReload }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-center'>
      <MainButton onClick={() => setIsOpen(true)}>
        Marcar como entregada
      </MainButton>
      <ModalWrapper open={isOpen} onClose={() => setIsOpen(false)}>
        <SetAsDeliveredContent
          homeworkId={homeworkId}
          onReload={() => {
            onReload();
            setIsOpen(false);
          }}
        />
      </ModalWrapper>
    </div>
  );
};

const SetAsDeliveredContent: FC<{
  homeworkId: string;
  onReload: VoidFunction;
}> = ({ homeworkId, onReload }) => {
  const { refetch, result } = useFetch({
    repo: 'student',
    action: 'deliverHomework',
    args: homeworkId,
  });

  useEffect(() => {
    if (result.data) {
      onReload();
    }
  }, [onReload, result]);

  return (
    <div className='space-y-4'>
      {result.loading && (
        <div className='flex justify-center'>
          <Loader />
        </div>
      )}
      {result.error && <Alert variant='error' message={result.error} />}
      <p className='text-gray-500'>
        ¿Estas seguro que quieres marcar esta tarea como entregada?
      </p>
      <div className='flex justify-end'>
        <MainButton onClick={refetch}>Marcar como entregada</MainButton>
      </div>
    </div>
  );
};

const AddFile: FC<{
  onReload: VoidFunction;
  homeworkId: string;
}> = ({ homeworkId, onReload }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex justify-center'>
      <MainButton onClick={() => setIsOpen(true)}>Agregar archivo</MainButton>
      <ModalWrapper open={isOpen} onClose={() => setIsOpen(false)}>
        <AddFileContent
          homeworkId={homeworkId}
          onReload={() => {
            onReload();
            setIsOpen(false);
          }}
        />
      </ModalWrapper>
    </div>
  );
};

const AddFileContent: FC<{
  onReload: VoidFunction;
  homeworkId: string;
}> = ({ homeworkId, onReload }) => {
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);

  const { refetch, result } = useFetch({
    repo: 'files',
    action: 'addAssignmentFile',
  });
  useEffect(() => {
    if (result.data) {
      onReload();
    }
  }, [onReload, refetch, result]);
  const handleSubmit = () => {
    if (!file) {
      return;
    }
    refetch({ homeworkId, file });
  };

  return (
    <form
      className='space-y-4'
      onSubmit={(e) => {
        if (result.loading) {
          return;
        }
        e.preventDefault();
        handleSubmit();
      }}
    >
      {result.loading && (
        <div className='flex justify-center'>
          <Loader />
        </div>
      )}
      {result.error && <Alert variant='error' message={result.error} />}
      <InputWithLabel
        type='file'
        label='Archivo'
        ref={fileRef}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setFile(files[0]);
          }
        }}
      ></InputWithLabel>
      {file && (
        <button
          type='button'
          onClick={() => {
            setFile(undefined);
            if (fileRef.current) {
              fileRef.current.value = '';
            }
          }}
          className='flex  justify-end text-red-500'
        >
          Eliminar
        </button>
      )}
      <div className='flex justify-end'>
        <MainButton type='submit'>Agregar</MainButton>
      </div>
    </form>
  );
};
