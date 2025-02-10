import { FieldError } from 'react-hook-form';

export const getInputFieldErrorMessage = (error: FieldError | undefined) => {
  if (!error) return undefined;
  return error.message;
};

//onHandleImage Validations
export const onHandleImageValidation = (value: any) => {
  const fileList = value as unknown as FileList;
  const file = fileList[0];
  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    return 'File size must be less than 2MB';
  }
  return true;
};
