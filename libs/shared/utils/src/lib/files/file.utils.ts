export type FileType = 'PDF' | 'IMAGE' | 'WORD' | 'EXCEL' | 'CSV' | 'UNKNOWN';

export const getFileType = (mimeType: string): FileType => {
  // Handle PDF files
  if (mimeType === 'application/pdf') return 'PDF';

  // Handle image files
  if (
    mimeType === 'image/jpeg' ||
    mimeType === 'image/png' ||
    mimeType === 'image/gif'
  )
    return 'IMAGE';

  // Handle Microsoft Word documents
  if (
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'WORD';

  // Handle Microsoft Excel files
  if (
    mimeType === 'application/vnd.ms-excel' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return 'EXCEL';

  // Handle CSV files
  if (mimeType === 'text/csv') return 'CSV';

  // Default to UNKNOWN
  return 'UNKNOWN';
};

export const getFormattedFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes === 0) return '0 B'; // Handle the case where the file size is 0 bytes

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));

  const size = sizeInBytes / Math.pow(1024, i); // Calculate the size in the correct unit

  return `${size.toFixed(2)} ${units[i]}`; // Return the formatted size
};
