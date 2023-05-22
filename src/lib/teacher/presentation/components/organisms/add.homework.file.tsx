/* eslint-disable no-use-before-define */
import { FC, useEffect, useRef, useState } from 'react';

import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { ModalWrapper } from '../../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';

type Props = {
  onReload: VoidFunction;
  courseId: string;
  homeworkId: string;
};
export const AddHomeworkFile: FC<Props> = ({
  courseId,
  homeworkId,
  onReload,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='flex justify-end'>
      <MainButton onClick={() => setIsModalOpen(true)}>
        Agregar archivo
      </MainButton>
      <ModalWrapper open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Content
          courseId={courseId}
          homeworkId={homeworkId}
          onReload={() => {
            setIsModalOpen(false);
            onReload();
          }}
        />
      </ModalWrapper>
    </div>
  );
};

const Content: FC<Props> = ({ courseId, homeworkId, onReload }) => {
  const [file, setFile] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);

  const { refetch, result } = useFetch({
    repo: 'files',
    action: 'addFileToHomeWork',
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
    refetch({ courseId, homeworkId, file });
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
