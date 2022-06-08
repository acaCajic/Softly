import React from 'react';

export const noop = () => {};

export type FormContextProps = {
  values: Record<string, any>;
  errors: Record<string, any>;
  touched: Record<string, any>;
  isValid: boolean;
  isSubmitted: boolean;
  isSubmitting: boolean;
  setErrors?: (errors: Record<string, any>) => void;
  setValues?: (values: Record<string, any>) => void;
  setTouched?: (values: Record<string, any>) => void;
  setIsSubmitted: (value: boolean) => void;
  setIsSubmitting: (value: boolean) => void;
  resetFieldValue: (fieldName: string) => void;
};

export default React.createContext<FormContextProps>({
  values: null,
  errors: null,
  touched: null,
  isValid: true,
  isSubmitted: false,
  isSubmitting: false,
  setValues: noop,
  setErrors: noop,
  setTouched: noop,
  setIsSubmitted: noop,
  setIsSubmitting: noop,
  resetFieldValue: noop,
});
