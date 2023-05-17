import axios from 'axios';

const axiosInstance = axios.create({});

export type ApiResult<T> =
  | {
      status: true;
      payload: T;
    }
  | {
      status: false;
      payload: string;
    };

export type ApiResponse<T> = Promise<ApiResult<T>>;

export type ParsedRepository<T> = {
  [K in keyof T]: T[K] extends (...args: infer U) => infer R
    ? (...args: U) => ApiResponse<R>
    : never;
};

export type ApiMethodResult<T> = T extends (...args: never[]) => infer R
  ? R extends ApiResponse<infer D>
    ? D
    : never
  : never;

type Query = Record<string, string>;

type CommonProps = {
  headers?: Record<string, string>;
  query?: Query;
};

type GetProps = CommonProps;
type PostProps = CommonProps & {
  body?: Record<string, unknown> | FormData;
};

export const buildFetcher = ({
  baseUrl,
  withApi = true,
}: {
  baseUrl: string;
  withApi?: boolean;
}): {
  get: <T>(path: string, props?: GetProps) => ApiResponse<T>;
  post: <T>(path: string, props?: PostProps) => ApiResponse<T>;
  put: <T>(path: string, props?: PostProps) => ApiResponse<T>;
  delete: <T>(path: string, props?: GetProps) => ApiResponse<T>;
} => {
  const buildUrl = ({ path, query }: { path: string; query?: Query }) => {
    const includeSlash = path.startsWith('/');
    const parsedPath = includeSlash ? path.slice(1) : path;
    const realPath = `${baseUrl}/${parsedPath}`;
    let url = withApi ? `/api/${realPath}` : `/${realPath}`;
    if (query) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        params.append(key, value);
      });
      url = `${url}?${params.toString()}`;
    }

    return url;
  };

  const parseError = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }

    return JSON.stringify(error);
  };

  const getDelete = async <T>(
    path: string,
    { headers, query, method }: GetProps & { method: 'get' | 'delete' }
  ): ApiResponse<T> => {
    const url = buildUrl({ path, query });

    try {
      const response = await axiosInstance[method]<ApiResult<T>>(url, {
        headers,
      });

      return response.data;
    } catch (error) {
      return {
        status: false,
        payload: parseError(error),
      };
    }
  };

  const postPut = async <T>(
    path: string,
    { headers, body, method, query }: PostProps & { method: 'post' | 'put' }
  ): ApiResponse<T> => {
    const url = buildUrl({ path, query });
    try {
      const response = await axiosInstance[method]<ApiResult<T>>(url, body, {
        headers,
      });

      return response.data;
    } catch (error) {
      return {
        status: false,
        payload: parseError(error),
      };
    }
  };

  return {
    get: (path, props) => getDelete(path, { ...(props ?? {}), method: 'get' }),
    post: (path, props) => postPut(path, { ...(props ?? {}), method: 'post' }),
    put: (path, props) => postPut(path, { ...(props ?? {}), method: 'put' }),
    delete: (path, props) =>
      getDelete(path, { ...(props ?? {}), method: 'delete' }),
  } as const;
};
