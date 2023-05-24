import { FC, PropsWithChildren } from 'react';

import { clsxm } from '../../../clsxm';

type Props = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger';
  isLoading?: boolean;
};
export const MainButton: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  children,
  type,
  isLoading,
  variant = 'primary',
}) => {
  return (
    <button
      type={type ?? 'button'}
      onClick={() => onClick?.()}
      disabled={isLoading}
      className={clsxm(
        'inline-flex relative items-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm',
        {
          'bg-indigo-600': variant === 'primary',
          'bg-red-600': variant === 'danger',
        },
        isLoading && ['cursor-not-allowed', 'opacity-50'],
        !isLoading &&
          onClick && {
            'hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
              variant === 'primary',
            'hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600':
              variant === 'danger',
            className,
          }
      )}
    >
      {children}
      {isLoading && (
        <span className='absolute inset-x-0 inset-y-1 flex items-center justify-center'>
          <svg
            className='h-5 w-5 animate-spin text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
            ></path>
          </svg>
        </span>
      )}
    </button>
  );
};
