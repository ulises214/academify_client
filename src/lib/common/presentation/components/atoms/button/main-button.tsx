import { FC, PropsWithChildren } from 'react';

import { clsxm } from '../../../clsxm';

type Props = {
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};
export const MainButton: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  children,
  type,
}) => {
  return (
    <button
      type={type ?? 'button'}
      onClick={() => onClick?.()}
      className={clsxm(
        'inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        className
      )}
    >
      {children}
    </button>
  );
};
