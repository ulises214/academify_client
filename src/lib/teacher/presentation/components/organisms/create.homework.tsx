import { FC, useEffect, useMemo, useState } from 'react';

import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { ModalWrapper } from '../../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';

export const CreateHomework: FC<{ reload: VoidFunction; courseId: string }> = ({
  reload,
  courseId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    closeAt: '',
  });
  const { refetch, result } = useFetch({
    repo: 'teacher',
    action: 'createHomeWork',
  });

  const handleSubmit = () => {
    refetch({
      ...data,
      closeAt: new Date(data.closeAt).toISOString(),
      courseId,
    });
  };

  useEffect(() => {
    if (result.data) {
      setIsModalOpen(false);
      reload();
      setData({
        closeAt: '',
        description: '',
        name: '',
      });
    }
  }, [reload, result]);

  const errors = useMemo(() => {
    const errors = {} as Record<string, string>;
    if (!data.name) {
      errors.name = 'El nombre es requerido';
    } else if (data.name.length < 5) {
      errors.name = 'El nombre debe tener al menos 5 caracteres';
    } else if (data.name.length > 50) {
      errors.name = 'El nombre debe tener menos de 50 caracteres';
    }
    if (!data.description) {
      errors.description = 'La descripción es requerida';
    } else if (data.description.length < 5) {
      errors.description = 'La descripción debe tener al menos 5 caracteres';
    } else if (data.description.length > 50) {
      errors.description = 'La descripción debe tener menos de 50 caracteres';
    }

    if (!data.closeAt) {
      errors.closeAt = 'La fecha de cierre es requerida';
    } else if (new Date(data.closeAt).getTime() < Date.now()) {
      errors.closeAt = 'La fecha de cierre debe ser mayor a la actual';
    }

    return errors;
  }, [data]);

  return (
    <>
      <div className='flex justify-end'>
        <MainButton onClick={() => setIsModalOpen(true)}>
          Crear tarea
        </MainButton>
      </div>
      <ModalWrapper onClose={() => setIsModalOpen(false)} open={isModalOpen}>
        {result.loading && (
          <div className='flex justify-center'>
            <Loader />
          </div>
        )}
        {result.error && <Alert variant='error' message={result.error} />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (Object.keys(errors).length) {
              return;
            }
            handleSubmit();
          }}
          className='space-y-4'
        >
          <InputWithLabel
            label='Nombre'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            error={!!errors.name}
            errorMessage={errors.name}
          />
          <InputWithLabel
            label='Descripción'
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            error={!!errors.description}
            errorMessage={errors.description}
          />
          <InputWithLabel
            label='Fecha de cierre'
            type='date'
            value={data.closeAt ? new Date(data.closeAt).toISOString() : ''}
            onChange={(e) =>
              setData({
                ...data,
                closeAt: new Date(e.target.value).toISOString(),
              })
            }
            error={!!errors.closeAt}
            errorMessage={errors.closeAt}
          />
          <div className='flex justify-end'>
            <MainButton type='submit'>Crear</MainButton>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
