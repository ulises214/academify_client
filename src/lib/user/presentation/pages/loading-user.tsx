import { Loader } from '../../../common/presentation/components/atoms/loader';

export const LoadingUser = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <Loader />
      <h2 className='text-center text-xl font-semibold text-gray-800'>
        Cargando...
      </h2>
    </div>
  );
};
