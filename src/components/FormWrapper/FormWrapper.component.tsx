import React, { useCallback, useContext } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import FormContext, { FormContextProps } from './providers/Form/Form.context';

export type FormWrapperProps<
  T extends Record<string, any> = Record<string, any>,
> = {
  children: React.ReactNode;
  className: string;
  onSubmit: (data: T) => Promise<any>;
} & Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  'ref' | 'onSubmit'
>;

export type FormWrapperRef = Partial<FormContextProps>;

function FormWrapper<T extends Record<string, any> = Record<string, any>>(
  props: FormWrapperProps<T>,
  ref: React.ForwardedRef<FormWrapperRef>,
) {
  const { children, className, onSubmit: pOnSubmit, ...rest } = props;

  const formValues = useContext(FormContext);

  const {
    values,
    isValid,
    errors,
    touched,
    isSubmitted,
    setTouched,
    setIsSubmitted,
    setIsSubmitting,
    resetFieldValue,
  } = formValues;

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setIsSubmitted(true);
      setTouched((oldTouched: Record<string, any>) => {
        return Object.entries(oldTouched).reduce((acc, value) => {
          return { ...acc, [value[0]]: true };
        }, {});
      });

      if (!isValid) return;

      try {
        setIsSubmitting(true);
        await pOnSubmit(values as T);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, isValid, pOnSubmit, setIsSubmitted, setIsSubmitting, setTouched],
  );

  useImperativeHandle(
    ref,
    () => ({ isValid, isSubmitted, values, errors, touched, resetFieldValue }),
    [isValid, isSubmitted, values, errors, touched, resetFieldValue],
  );

  return (
    <form onSubmit={onSubmit} className={className} {...rest}>
      {children}
    </form>
  );
}

export default forwardRef(FormWrapper) as <T extends Record<string, any>>(
  props: FormWrapperProps<T> & { ref?: React.Ref<FormWrapperRef> },
) => React.ReactElement;
