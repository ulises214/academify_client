import { FC } from 'react';

import { clsxm } from '../../clsxm';
import styles from './loader.module.css';

export const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsxm(
        styles.loader,
        'ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4',
        className
      )}
    ></div>
  );
};
