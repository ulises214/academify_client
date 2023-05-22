/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';

import {
  FilesApiRepository,
  FilesRepository,
} from '../../../files/data/files.repository';
import {
  StatisticsApiRepository,
  StatisticsRepository,
} from '../../../home/application/statistics.repository';
import {
  StudentApiRepository,
  StudentRepository,
} from '../../../student/data/student-repository';
import {
  TeacherApiRepository,
  TeacherRepository,
} from '../../../teacher/data/teacher.repository';
import {
  UserApiRepository,
  UserRepository,
} from '../../../user/application/user.repository';
import { ApiResponse } from '../../infrastructure/fetch.wrapper';

export type Repo = {
  user: UserRepository;
  student: StudentRepository;
  teacher: TeacherRepository;
  statistics: StatisticsRepository;
  files: FilesRepository;
};

const repos: Repo = {
  user: UserApiRepository,
  student: StudentApiRepository,
  teacher: TeacherApiRepository,
  statistics: StatisticsApiRepository,
  files: FilesApiRepository,
};

export type FetchData<
  R extends keyof Repo,
  T extends keyof Repo[R]
> = Repo[R][T] extends () => ApiResponse<infer U>
  ? U
  : Repo[R][T] extends (...args: any[]) => ApiResponse<infer U>
  ? U
  : never;

export type FetchActionArgs<
  R extends keyof Repo,
  T extends keyof Repo[R]
> = Repo[R][T] extends () => ApiResponse<any>
  ? undefined
  : Repo[R][T] extends (args: infer U) => ApiResponse<any>
  ? U
  : never;

type LoadingState = {
  loading: boolean;
  error: undefined;
  data: undefined;
};
type ErrorState = {
  loading: false;
  error: string;
  data: undefined;
};

type SuccessState<R extends keyof Repo, T extends keyof Repo[R]> = {
  loading: false;
  error: undefined;
  data: FetchData<R, T>;
};

export type UseFetchReturn<R extends keyof Repo, T extends keyof Repo[R]> = {
  result: LoadingState | ErrorState | SuccessState<R, T>;
  refetch: (args?: FetchActionArgs<R, T>) => void;
};

type FetchProps<R extends keyof Repo, T extends keyof Repo[R]> = {
  repo: R;
  action: T;
  args?: FetchActionArgs<R, T>;
  callOnStart?: boolean;
};

export const useFetch = <R extends keyof Repo, T extends keyof Repo[R]>({
  action,
  args,
  callOnStart,
  repo,
}: FetchProps<R, T>): UseFetchReturn<R, T> => {
  const [result, setResult] = useState<UseFetchReturn<R, T>['result']>({
    loading: callOnStart ? true : false,
    error: undefined,
    data: undefined,
  });

  const refetch = useCallback(
    (args1?: FetchActionArgs<R, T>) => {
      setResult({
        loading: true,
        error: undefined,
        data: undefined,
      });
      const api = repos[repo];
      const method = api[action] as (...args: any[]) => ApiResponse<any>;
      method(args1 ?? args ?? {})
        .then((response) => {
          if (response.status) {
            setResult({
              loading: false,
              error: undefined,
              data: response.payload as FetchData<R, T>,
            });
          } else {
            setResult({
              loading: false,
              error: response.payload,
              data: undefined,
            });
          }
        })
        .catch((e) => {
          const message = e instanceof Error ? e.message : JSON.stringify(e);
          setResult({
            loading: false,
            error: message,
            data: undefined,
          });
        });
    },
    [action, args, repo]
  );

  useEffect(() => {
    if (callOnStart) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    result,
    refetch,
  };
};
