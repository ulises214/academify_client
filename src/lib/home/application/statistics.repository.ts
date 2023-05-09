import {
  ApiResponse,
  buildFetcher,
} from '../../common/infrastructure/fetch.wrapper';

export type StatisticsRepository = {
  getCounts(): ApiResponse<{
    courses: number;
    students: number;
    teachers: number;
  }>;
};

const fetch = buildFetcher({
  baseUrl: 'statistics',
});

export const StatisticsApiRepository: StatisticsRepository = {
  getCounts: () => fetch.get({ path: 'counts' }),
};
