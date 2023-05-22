const mimeTypeLabels: Record<string, string | undefined> = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'Word',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    'PowerPoint',
  'application/vnd.ms-powerpoint': 'PowerPoint',
  'application/msword': 'Word',
  'application/vnd.ms-excel': 'Excel',
  'application/zip': 'Zip',
  'application/x-rar-compressed': 'Rar',
  'application/x-7z-compressed': '7z',
  'application/x-tar': 'Tar',
  'application/x-bzip': 'Bzip',
  'application/x-bzip2': 'Bzip2',
  'application/x-gzip': 'Gzip',

  'image/jpeg': 'Imagen (JPG)',
  'image/png': 'Imagen (PNG)',
  'image/gif': 'Imagen (GIF)',
  'image/bmp': 'Imagen (BMP)',
  'image/webp': 'Imagen (WEBP)',

  'audio/mpeg': 'Audio (MP3)',
  'audio/ogg': 'Audio (OGG)',
  'audio/wav': 'Audio (WAV)',
  'audio/x-wav': 'Audio (WAV)',
  'audio/x-ms-wma': 'Audio (WMA)',
  'audio/x-aac': 'Audio (AAC)',
  'audio/x-m4a': 'Audio (M4A)',

  'video/mp4': 'Video (MP4)',
  'video/ogg': 'Video (OGG)',
  'video/webm': 'Video (WEBM)',

  'text/plain': 'Texto (TXT)',
  'text/csv': 'Texto (CSV)',
  'text/html': 'Texto (HTML)',
  'text/css': 'Texto (CSS)',
  'text/javascript': 'Texto (JS)',

  'application/json': 'JSON',
  'application/xml': 'XML',
  'application/rtf': 'RTF',
} as const;

export const getMimeTypeLabel = (mimeType: string): string => {
  return mimeTypeLabels[mimeType] ?? mimeType;
};
