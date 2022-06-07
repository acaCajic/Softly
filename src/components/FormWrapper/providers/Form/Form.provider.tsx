import React, { useCallback, useMemo, useState } from 'react';
import FormContext from './Form.context';

type FormProviderProps = {
  children?: React.ReactNode;
};

const FormProvier: React.FC<FormProviderProps> = (props) => {
  const { children } = props;

  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<Record<string, any>>({});

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isValid = useMemo(() => {
    const isEmpty = Object.keys(errors).length === 0;

    if (isEmpty) return false;
    return Object.values(errors).every(
      (err) => err === undefined && typeof err !== 'string',
    );
  }, [errors]);

  const resetFieldValue = useCallback((fieldName: string) => {
    setValues((oldValues) => ({ ...oldValues, [fieldName]: undefined }));
    setErrors((oldErrors) => ({ ...oldErrors, [fieldName]: undefined }));
    setTouched({});
  }, []);

  return (
    <FormContext.Provider
      value={{
        values,
        isValid,
        errors,
        touched,
        isSubmitted,
        isSubmitting,
        setIsSubmitted,
        setIsSubmitting,
        resetFieldValue,
        setErrors,
        setValues,
        setTouched,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvier;
