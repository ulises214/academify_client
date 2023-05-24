import { AppFile } from '../../common/domain/models/file';
import {
  buildFetcher,
  ParsedRepository,
} from '../../common/infrastructure/fetch.wrapper';

const fetch = buildFetcher('files');

export type FilesRepository = ParsedRepository<{
  addFileToHomeWork(arg0: {
    file: File;
    homeworkId: string;
    courseId: string;
  }): AppFile;
  addAssignmentFile(arg0: { file: File; homeworkId: string }): AppFile;
  downloadFile(fileId: string): AppFile & {
    data: string;
  };
}>;

export const FilesApiRepository: FilesRepository = {
  addFileToHomeWork: ({ file, homeworkId, courseId }) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch.post(`homeworks/${courseId}/${homeworkId}/file`, {
      body: formData,
    });
  },
  addAssignmentFile: ({ file, homeworkId }) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch.post(`assignments/${homeworkId}/file`, {
      body: formData,
    });
  },
  downloadFile: (fileId) => fetch.get(`${fileId}`),
} as const;
