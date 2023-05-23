import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher('statistics');

export type StatisticsRepository = ParsedRepository<{
  getCounts(): {
    courses: number;
    students: number;
    teachers: number;
  };
}>;

export const StatisticsApiRepository: StatisticsRepository = {
  getCounts: () => fetch.get('counts'),
};
