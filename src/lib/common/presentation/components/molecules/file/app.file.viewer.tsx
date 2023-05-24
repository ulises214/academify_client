/* eslint-disable simple-import-sort/imports */
import { FC, useEffect } from 'react';

import { AppFile } from '../../../../domain/models/file';
import { getErrorMessage } from '../../../../domain/utils/get-error-message';
import { getMimeTypeLabel } from '../../../../domain/utils/get.mimetype.label';
import { clsxm } from '../../../clsxm';
import { useFetch } from '../../../hooks/api-fetch';
import { MainButton } from '../../atoms/button/main-button';

export const AppFileViewer: FC<{
  file: AppFile;
  type: 'homework' | 'assignment';
}> = ({ file }) => {
  const { result, refetch } = useFetch({
    repo: 'files',
    action: 'downloadFile',
    args: file.id,
  });

  useEffect(() => {
    if (!result.data) {
      return;
    }
    const { data, type } = result.data;
    const binaryString = window.atob(data);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Crea un Blob a partir del ArrayBuffer
    const blob = new Blob([bytes.buffer], { type });

    // Crea una URL del Blob
    const blobUrl = URL.createObjectURL(blob);

    // Abre una nueva pestaña con la URL del Blob
    window.open(blobUrl, '_blank');
  }, [result]);

  return (
    <li
      className={clsxm(
        'flex flex-col justify-between',
        'rounded-md border border-slate-200',
        'px-2 py-1 space-y-2'
      )}
    >
      <div className='flex justify-between'>
        <span className='font-bold'>{file.name}</span>
        <div>
          <span className='rounded-full bg-slate-200 px-2 py-0.5 text-xs text-gray-700'>
            {getMimeTypeLabel(file.type)}
          </span>
        </div>
      </div>
      <div className='flex items-center gap-1'>
        {result.error && (
          <div className='text-xs text-red-500'>
            <span className='font-bold'>Error:</span>{' '}
            {getErrorMessage(result.error)}
          </div>
        )}
        <div className='flex grow justify-end'>
          <MainButton
            isLoading={result.loading}
            onClick={refetch}
            className='rounded-full px-4 py-0.5 text-sm'
          >
            Ver
          </MainButton>
        </div>
      </div>
    </li>
  );
};
