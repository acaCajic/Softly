import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import FormContext from '../../providers/Form/Form.context';

type ExtractPropTypes<Type> = Type extends React.FC<infer P> ? P : never;

export type FieldInputProps<FieldValue, T extends HTMLElement = HTMLElement> = {
  name: string;
  value?: FieldValue;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<T> | any) => void;
};

export type FieldMetaProps = {
  touched: boolean;
  dirty: boolean;
  error: string;
};

export type FieldRenderProps<
  FieldValue,
  T extends HTMLElement = HTMLElement,
> = {
  input: FieldInputProps<FieldValue, T>;
  meta: FieldMetaProps;
};

export type FieldValidator<FieldValue> = (
  value: FieldValue,
  allValues?: object,
) => any | Promise<any>;

export type FieldProps<T extends any = string> = {
  initialValue?: T;
  component: React.FC<any> | React.ReactNode | string;
  validate?: FieldValidator<T>;
} & FieldInputProps<T> &
  Record<string, any>;

const Field: React.FC<FieldProps> = <T extends any = string>(
  props: FieldProps<T>,
) => {
  const {
    name,
    initialValue = '',
    component: pCompoennt,
    validate,
    onChange,
    ...rest
  } = props;

  const formValues = useContext(FormContext);

  const {
    values,
    touched,
    errors,
    isSubmitted,
    setValues,
    setErrors,
    setTouched,
  } = formValues;

  const dirty = useMemo(
    () => values && values?.[name] !== undefined,
    [name, values],
  );

  //this data will be availble on each component passed to Field component prop
  //like one in InputField component
  const componentFieldData = useMemo(
    () =>
      ({
        input: {
          name,
          value: values?.[name] || initialValue,
          onChange: (value: string) => {
            //We need to validate field when ever their value is changed
            fieldChanged.current = false;
            setValues((oldValues: Record<string, any>) => ({
              ...oldValues,
              [name]: value,
            }));
          },
        },
        meta: {
          touched: touched[name],
          error: errors[name],
          dirty,
        },
      } as FieldRenderProps<T>),
    [initialValue, values, name, touched, dirty, errors, setValues],
  );

  //we need to extend component passed as a prop with values
  //related to handling form data (input, meta)
  //onBlur is used to update touched object for spec field name
  const component = useMemo(() => {
    const Component = pCompoennt as React.FC<
      ExtractPropTypes<typeof pCompoennt> &
        React.DOMAttributes<typeof pCompoennt>
    >;

    return (
      <Component
        {...rest}
        {...componentFieldData}
        onBlur={() =>
          setTouched((oldTouched: Record<string, any>) => ({
            ...oldTouched,
            [name]: true,
          }))
        }
        value={values[name]}
      />
    );
  }, [componentFieldData, name, values, pCompoennt, rest, setTouched]);

  const validateField = useCallback(() => {
    setErrors((oldErrors: Record<keyof typeof values, string>) => ({
      ...oldErrors,
      [name]: (validate as FieldValidator<T>)(values[name], values),
    }));
  }, [name, values, setErrors, validate]);

  const fieldChanged = useRef<boolean>(false);

  //If field is touched or form is submitted then call validate function
  //fieldChange value is used to control when will this useEffect will execute
  useEffect(() => {
    if ((touched || isSubmitted) && !fieldChanged.current && validate) {
      validateField();
      fieldChanged.current = true;
    }
  }, [touched, isSubmitted, validateField, validate]);

  //Set initial value in touched object for each field name on false
  useEffect(() => {
    setTouched((oldTouched: Record<string, any>) => ({
      ...oldTouched,
      [name]: false,
    }));
  }, [name, setTouched]);

  //When all data in touched object are true reset fieldChanged value
  //to make validation active again.
  useEffect(() => {
    if (Object.values(touched).every((data) => !!data))
      fieldChanged.current = false;
  }, [touched]);

  return component;
};

export default Field;
