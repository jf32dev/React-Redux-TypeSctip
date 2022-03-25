type ReturnTypeValid = {
  isValid: true;
  validFile: File;
};

type ReturnTypeInvalid = {
  isValid: false;
  fileError: string;
};

type ReturnType = ReturnTypeValid | ReturnTypeInvalid;

const fileErrors = {
  TOO_LARGE: 'The uploaded file exceeds the maximum allowed file size.',
  INVALID_EXTENSION: 'File extension is not valid.',
};

// NOTE: error handling will later be used in the Final Form on Field level
export const validateFile = (
  file: File,
  acceptedFiles?: string[],
  maxFileSize?: number
): ReturnType => {
  if (acceptedFiles) {
    const regex = new RegExp(
      `\\.(${acceptedFiles.join('|').replace(/\./g, '')})$`,
      'i'
    );
    if (!regex.test(file.name)) {
      return { isValid: false, fileError: fileErrors.INVALID_EXTENSION };
    }
  }
  if (maxFileSize) {
    const fileSize = file.size / 1024 / 1024;
    if (fileSize > maxFileSize) {
      return { isValid: false, fileError: fileErrors.TOO_LARGE };
    }
  }

  return { isValid: true, validFile: file };
};
