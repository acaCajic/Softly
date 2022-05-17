import React, { forwardRef } from 'react';
import FormWrapper, {
  FormWrapperProps,
  FormWrapperRef,
} from './FormWrapper.component';
import FormProvider from './providers/Form';

const Wrapper: React.ForwardRefRenderFunction<
  FormWrapperRef,
  FormWrapperProps
> = <T extends Record<string, any> = Record<string, any>>(
  props: FormWrapperProps<T>,
  ref: any,
) => {
  return (
    <FormProvider>
      <FormWrapper<T> ref={ref} {...props} />
    </FormProvider>
  );
};

export default forwardRef(Wrapper) as <T extends Record<string, any>>(
  props: FormWrapperProps<T> & { ref?: React.Ref<FormWrapperRef> },
) => React.ReactElement;
