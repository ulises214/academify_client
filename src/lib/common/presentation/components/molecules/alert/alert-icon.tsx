import { XMarkIcon } from '@heroicons/react/20/solid';
import { FC, PropsWithChildren } from 'react';

import { clsxm } from '../../../clsxm';
import { AlertVariant } from './index';

export const AlertActionIconButton: FC<
  PropsWithChildren<{
    onClick: VoidFunction;
    Icon: typeof XMarkIcon;
    variant: AlertVariant;
  }>
> = ({ onClick, children, Icon, variant }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={clsxm(
        'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'success' && [
          'bg-green-50 hover:bg-green-200 focus:ring-green-600 focus:ring-offset-green-50',
        ],
        variant === 'info' && [
          'bg-cyan-50 hover:bg-cyan-200 focus:ring-cyan-600 focus:ring-offset-cyan-50',
        ],
        variant === 'warning' && [
          'bg-yellow-50 hover:bg-yellow-200 focus:ring-yellow-600 focus:ring-offset-yellow-50',
        ],
        variant === 'error' && [
          'bg-red-50 hover:bg-red-200 focus:ring-red-600 focus:ring-offset-red-50',
        ]
      )}
    >
      <span className='sr-only'>{children}</span>
      <Icon className='h-5 w-5' aria-hidden='true' />
    </button>
  );
};
