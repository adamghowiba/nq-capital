import { useState } from 'react';

export type FileUploadErrorType =
  | 'max_files_exceeded'
  | 'invalid_type'
  | 'file_too_large';

export interface UseFileUploadError {
  type: FileUploadErrorType;
  message: string;
}

export interface UseFileUploadParams {
  accept?: string[];
  maxFiles?: number;
  maxSize?: number;
}

export const useFileUpload = (params: UseFileUploadParams) => {
  const [files, setFiles] = useState<(File & { error?: UseFileUploadError })[]>(
    []
  );

  const maxSize = params.maxSize;
  const maxFiles = params.maxFiles;

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return setFiles([]);

    const fileArray = Array.from(files);

    if (maxFiles && files.length > maxFiles) {
      console.error('Max files exceeded');
      return;
    }

    if (params.accept) {
      const invalidFiles = fileArray.filter(
        (file) => !params.accept?.includes(file.type)
      );

      if (invalidFiles.length) console.error('Invalid file type');
    }

    if (maxSize && maxSize > 0) {
      const invalidFiles = fileArray.filter((file) => file.size > maxSize);

      if (invalidFiles.length) console.error('File size too large');
    }

    // TODO: Handle file reading to show loading state
    // TODO: Handle file reading to show error state

    setFiles(fileArray);
  };

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile !== file));
  };

  const clear = () => {
    setFiles([]);
  };

  return { onFileChange, removeFile, clear, files };
};
