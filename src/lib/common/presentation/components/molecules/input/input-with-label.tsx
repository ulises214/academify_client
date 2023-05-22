import { forwardRef, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
};

export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, errorMessage, ...inputProps }, ref) => {
    return (
      <div className='mb-4'>
        {label && (
          <label className='mb-2 block text-sm font-bold text-gray-700'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:shadow-sm focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300'}`}
          {...inputProps}
        />
        {error && (
          <p className='mt-1 text-xs italic text-red-500'>{errorMessage}</p>
        )}
      </div>
    );
  }
);
