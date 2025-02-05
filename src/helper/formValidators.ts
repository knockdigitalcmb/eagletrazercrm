import { FieldError } from 'react-hook-form';

export const getInputFieldErrorMessage = (error: FieldError | undefined) => {
  if (!error) return undefined;
  return error.message;
};
