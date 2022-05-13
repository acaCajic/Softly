import React, { useCallback, useMemo } from 'react';
import { FieldRenderProps } from '../../FormWrapper/components/Field/Field.components';
import { InputProps } from '../../UI/Input/Input.component';
import Input from '../../UI/Input';

type InputFieldProps = Omit<InputProps, 'ref'> &
  FieldRenderProps<string, HTMLElement>;

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    input: { onChange, ...restInput },
    meta: { error, touched },
    ...rest
  } = props;

  const hasError = useMemo(() => !!(error && touched), [error, touched]);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <Input
      {...rest}
      {...restInput}
      errMsg={error}
      hasError={hasError}
      onChange={handleOnChange}
    />
  );
};

export default InputField;
