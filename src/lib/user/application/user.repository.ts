import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';
import { LoginUser } from '../domain/user';

const fetch = buildFetcher({ baseUrl: 'users' });

export type UserRepository = ParsedRepository<{
  getProfile(): LoginUser;
}>;

export const UserApiRepository: UserRepository = {
  getProfile: () => fetch.get('whoami'),
};
