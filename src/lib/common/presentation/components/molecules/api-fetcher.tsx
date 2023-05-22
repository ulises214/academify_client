import { useEffect } from 'react';

import {
  FetchActionArgs,
  FetchData,
  Repo,
  useFetch,
  UseFetchReturn,
} from '../../hooks/api-fetch';
import { Loader } from '../atoms/loader';
import { Alert } from './alert';

type OnError<R extends keyof Repo, T extends keyof Repo[R]> =
  | ((arg0: {
      error: string;
      refetch: UseFetchReturn<R, T>['refetch'];
    }) => JSX.Element)
  | {
      alertMessage: string;
      canRefetch?: boolean;
    };

type PropsRaw<R extends keyof Repo, T extends keyof Repo[R]> = {
  action: T;
  repo: R;
  allowRetry?: boolean;
  children: (arg0: {
    refetch: UseFetchReturn<R, T>['refetch'];
    data: FetchData<R, T>;
  }) => JSX.Element;
  onError?: OnError<R, T>;
  onLoading?: () => JSX.Element;
  allowUndefined?: boolean;
};

type Props<R extends keyof Repo, T extends keyof Repo[R]> = PropsRaw<R, T> &
  (FetchActionArgs<R, T> extends void
    ? {
        args?: never;
      }
    : {
        args: FetchActionArgs<R, T>;
      });

const onErrorIsFunction = <R extends keyof Repo, T extends keyof Repo[R]>(
  onError: OnError<R, T>
): onError is (arg0: {
  error: string;
  refetch: UseFetchReturn<R, T>['refetch'];
}) => JSX.Element => typeof onError === 'function';

export const ApiFetcher = <R extends keyof Repo, T extends keyof Repo[R]>({
  action,
  allowUndefined,
  args,
  allowRetry,
  children,
  onError,
  repo,
  onLoading,
}: Props<R, T>): JSX.Element => {
  const { refetch, result } = useFetch({
    action,
    repo,
    args,
    callOnStart: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (result.loading) {
    return onLoading ? (
      onLoading()
    ) : (
      <div className='flex justify-center'>
        <Loader />
      </div>
    );
  }
  if (result.error) {
    if (!onError) {
      return (
        <Alert
          onReload={allowRetry ? refetch : undefined}
          variant='error'
          message={result.error}
        ></Alert>
      );
    }

    if (onErrorIsFunction(onError)) {
      return onError({
        error: result.error,
        refetch,
      });
    }

    return (
      <Alert
        variant='error'
        message={`${onError.alertMessage} - ${result.error}`}
        onReload={onError.canRefetch ? () => refetch(args) : undefined}
      />
    );
  }

  if (result.data || allowUndefined) {
    return children({ refetch, data: result.data as FetchData<R, T> });
  }

  return onLoading ? (
    onLoading()
  ) : (
    <div className='mx-auto'>
      <Loader />
    </div>
  );
};
