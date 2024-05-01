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
