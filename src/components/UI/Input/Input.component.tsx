import classNames from 'classnames';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Input.style.scss';

type InputProps = {
  labelName?: string;
  prefixNode?: React.ReactNode;
  sufixNode?: React.ReactNode;
  hasError?: boolean;
  errMsg?: string;
  className?: string;
  validateFunction?: (value: string) => boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.ForwardRefRenderFunction<
  HTMLInputElement | null,
  InputProps
> = (props, ref) => {
  const {
    labelName,
    sufixNode,
    prefixNode,
    hasError,
    className,
    disabled,
    errMsg = 'Invalid value',
    validateFunction,
    onChange: pOnChange,
    ...rest
  } = props;

  const classes = classNames(
    'input',
    { 'input--error': hasError },
    { 'input--disabled': disabled },
    className,
  );

  const [value, setValue] = useState<string>('');

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      pOnChange(event);
    },
    [pOnChange],
  );

  const hasErrorState = useMemo(
    () => validateFunction && value !== '' && !validateFunction(value),
    [validateFunction, value],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classes}>
      <label className="input__label">{labelName}</label>
      <div className="input__container">
        {prefixNode}
        <input
          ref={(value) => {
            (ref as Function)?.(value);
            inputRef.current = value;
          }}
          autoComplete="off"
          onChange={onChange}
          {...rest}
        />
        {sufixNode}
      </div>
      {(hasError || hasErrorState) && (
        <p className="input__error-label">{errMsg}</p>
      )}
    </div>
  );
};

export default forwardRef(Input);
