import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { FC, useEffect, useState } from 'react';

import { MainButton } from '../../../../common/presentation/components/atoms/button/main-button';
import { Loader } from '../../../../common/presentation/components/atoms/loader';
import { Alert } from '../../../../common/presentation/components/molecules/alert';
import { InputWithLabel } from '../../../../common/presentation/components/molecules/input/input-with-label';
import { ModalWrapper } from '../../../../common/presentation/components/molecules/modals/modal-wrapper';
import { useFetch } from '../../../../common/presentation/hooks/api-fetch';

export const JoinToCourse: FC<{
  reload: VoidFunction;
}> = ({ reload }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState('');
  const { refetch, result } = useFetch({
    repo: 'student',
    action: 'joinToCourse',
  });

  const handleSubmit = () => {
    if (data.length !== 6) {
      return;
    }
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
        Unirse a un curso
      </MainButton>
      <ModalWrapper open={showDialog} onClose={() => setShowDialog(false)}>
        <form
          className='space-y-4'
          onSubmit={(e) => {
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

          <h2 className='text-2xl font-bold'>Unirse a un curso</h2>
          <p className='text-gray-600'>
            Ingresa el código del curso al que deseas unirte
          </p>
          <InputWithLabel
            label='Código'
            value={data}
            onChange={(e) => setData(e.target.value)}
            error={data.length !== 6}
            errorMessage='El código debe tener 6 caracteres'
          />
          <div className='flex justify-end'>
            <MainButton type='submit'>Unirse</MainButton>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
