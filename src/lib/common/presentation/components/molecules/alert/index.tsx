import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { getErrorMessage } from '../../../../domain/utils/get-error-message';
import { clsxm } from '../../../clsxm';
import { AlertActionIconButton } from './alert-icon';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

const getIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'success':
      return CheckCircleIcon;
    case 'error':
      return XCircleIcon;
    case 'warning':
      return ExclamationTriangleIcon;
    case 'info':
      return InformationCircleIcon;
    default:
      return XMarkIcon;
  }
};
type Props = {
  variant: AlertVariant;
  message: string | string[];
  onClose?: () => void;
  onReload?: () => void;
  className?: string;
  onClick?: VoidFunction;
  isLoading?: boolean;
  withElevation?: boolean;
};

export const Alert: FC<Props> = ({
  message,
  variant,
  onClose,
  className,
  onReload,
  onClick,
  isLoading,
  withElevation = true,
}) => {
  const Icon = getIcon(variant);

  const clickable = !!onClick && !isLoading;

  return (
    <div
      onClick={onClick}
      className={clsxm(
        '!transition-colors',
        //#region variant
        variant === 'success' && [
          'bg-green-100 text-green-600',
          clickable && 'hover:bg-green-200',
        ],
        variant === 'error' && [
          'bg-red-100 text-red-500',
          clickable && 'hover:bg-red-200',
        ],
        variant === 'warning' && [
          'bg-yellow-100 text-yellow-600',
          clickable && 'hover:bg-yellow-200',
        ],
        variant === 'info' && [
          'bg-blue-100 text-cyan-800',
          clickable && 'hover:bg-blue-200',
        ],
        //#endregion variant
        'rounded-md p-4 w-full relative',
        withElevation && 'shadow-lg',
        onClick && !isLoading && 'cursor-pointer',
        className,
        isLoading &&
          'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait'
      )}
    >
      <div className='flex items-center'>
        <div className='flex shrink-0'>
          <Icon className={'h-5 w-5'} aria-hidden='true' />
        </div>
        <div className='ml-3'>
          {typeof message === 'string' ? (
            <p className={clsxm('text-sm font-medium')}>
              {getErrorMessage(message)}
            </p>
          ) : (
            message.map((m, i) => (
              <p key={i} className={clsxm('text-sm font-medium')}>
                {getErrorMessage(m)}
              </p>
            ))
          )}
        </div>
        <div className='ml-auto pl-3'>
          <div className='-m-1.5 space-x-2'>
            {!!onClose && (
              <AlertActionIconButton
                onClick={onClose}
                Icon={XMarkIcon}
                variant={variant}
              >
                Cerrar
              </AlertActionIconButton>
            )}
            {onReload && (
              <AlertActionIconButton
                onClick={() => onReload()}
                Icon={ArrowPathIcon}
                variant={variant}
              >
                Reload
              </AlertActionIconButton>
            )}
          </div>
        </div>
      </div>
      {isLoading && (
        <div
          className={clsxm(
            'rounded-md inset-0 absolute flex justify-center items-center backdrop-blur-[1px]'
          )}
        >
          <ImSpinner2 className='h-6 w-6 animate-spin' />
        </div>
      )}
    </div>
  );
};
