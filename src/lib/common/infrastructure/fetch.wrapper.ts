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

type Query = Record<string, string>;

type CommonProps = {
  path: string;
  headers?: Record<string, string>;
  query?: Query;
};

type GetProps = CommonProps;
type PostProps = CommonProps & {
  body: Record<string, unknown> | FormData;
};

export const buildFetcher = ({
  baseUrl,
  withApi = true,
}: {
  baseUrl: string;
  withApi?: boolean;
}): {
  get: <T>(props: GetProps) => ApiResponse<T>;
  post: <T>(props: PostProps) => ApiResponse<T>;
  put: <T>(props: PostProps) => ApiResponse<T>;
  delete: <T>(props: GetProps) => ApiResponse<T>;
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

  const getDelete = async <T>({
    path,
    headers,
    query,
    method,
  }: GetProps & { method: 'get' | 'delete' }): ApiResponse<T> => {
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

  const postPut = async <T>({
    path,
    headers,
    body,
    method,
    query,
  }: PostProps & { method: 'post' | 'put' }): ApiResponse<T> => {
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
    get: (props) => getDelete({ ...props, method: 'get' }),
    post: (props) => postPut({ ...props, method: 'post' }),
    put: (props) => postPut({ ...props, method: 'put' }),
    delete: (props) => getDelete({ ...props, method: 'delete' }),
  } as const;
};
