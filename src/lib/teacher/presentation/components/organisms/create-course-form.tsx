import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { FC, useEffect, useMemo, useState } from 'react';

import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { ToggleWithDescription } from '../../../../common/presentation/components/molecules/input/toggle-with-description';
import { ModalWrapper } from '../../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';

export const CreateCourseForm: FC<{ reload: VoidFunction }> = ({ reload }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });
  const { refetch, result } = useFetch({
    action: 'createCourse',
    repo: 'teacher',
  });

  const errors = useMemo(() => {
    const errors = {
      name: '',
      description: '',
    };
    if (data.name.length < 3) {
      errors['name'] = 'El nombre debe tener al menos 3 caracteres';
    } else if (data.name.length > 50) {
      errors['name'] = 'El nombre debe tener menos de 50 caracteres';
    }
    if (data.description.length < 3) {
      errors['description'] = 'La descripción debe tener al menos 3 caracteres';
    } else if (data.description.length > 50) {
      errors['description'] =
        'La descripción debe tener menos de 50 caracteres';
    }

    return errors;
  }, [data]);

  const handleSubmit = () => {
    refetch(data);
  };

  useEffect(() => {
    if (result.data) {
      reload();
      setShowDialog(false);
    }
  }, [reload, result]);

  return (
    <>
      <MainButton onClick={() => setShowDialog(true)}>
        <PlusCircleIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
        Button text
      </MainButton>
      <ModalWrapper open={showDialog} onClose={() => setShowDialog(false)}>
        <form
          className='space-y-4'
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className='flex justify-center'>
            {result.loading && <Loader />}
          </div>
          {result.error && <Alert variant='error' message={result.error} />}
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Crear un nuevo curso
          </h3>
          <InputWithLabel
            label='Nombre'
            error={!!errors.name}
            errorMessage={errors.name || undefined}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <InputWithLabel
            label='Descripción'
            error={!!errors.description}
            errorMessage={errors.description || undefined}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <ToggleWithDescription
            title='Estado'
            description='Si el curso está activo o no'
            enabled={data.status === 'ACTIVE'}
            setEnabled={(enabled) =>
              setData({ ...data, status: enabled ? 'ACTIVE' : 'INACTIVE' })
            }
          />
          <div className='flex justify-end'>
            <MainButton type='submit'>Crear curso</MainButton>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
