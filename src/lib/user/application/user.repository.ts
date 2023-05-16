import {
  ApiResponse,
  buildFetcher,
} from '../../common/infrastructure/fetch.wrapper';
import { LoginUser } from '../domain/user';

export type UserRepository = {
  getProfile(): ApiResponse<LoginUser>;
};

const fetch = buildFetcher({
  baseUrl: 'users',
  withApi: true,
});

export const UserApiRepository: UserRepository = {
  getProfile: () => fetch.get({ path: '/whoami' }),
};
