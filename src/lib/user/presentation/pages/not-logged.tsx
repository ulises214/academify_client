import { FC } from 'react';

import UdcIcon from '../../../../assets/udc-icon.png';
import { clsxm } from '../../../common/presentation/clsxm';

export const NotLogged: FC = () => {
  return (
    <main className={clsxm('h-full w-full p-8', 'bg-[#26335D]')}>
      <div
        className={clsxm(
          'container mx-auto rounded-lg',
          'flex h-full w-full flex-col items-center gap-8 p-4',
          'text-white p-2'
        )}
      >
        <div className='container flex items-center justify-between text-white'>
          <div>Academify</div>
          <div className='rounded-full bg-white p-1'>
            <img src={UdcIcon} alt='UDC' className='h-8 w-8' text-white />
          </div>
        </div>
        <h1 className='text-4xl font-bold'>No has iniciado tu sesión</h1>
        <a
          href='/api/auth/login'
          className='rounded-sm bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600'
        >
          Iniciar sesión
        </a>
      </div>
    </main>
  );
};
