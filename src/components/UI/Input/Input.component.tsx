import classNames from 'classnames';
import React, { useEffect } from 'react';
import './Input.style.scss';

type InputProps = {
  labelName?: string;
  prefixNode?: React.ReactNode;
  sufixNode?: React.ReactNode;
  hasError?: boolean;
  className?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const {
    labelName,
    sufixNode,
    prefixNode,
    hasError,
    className,
    disabled,
    ...rest
  } = props;

  const classes = classNames(
    'input',
    { 'input--error': hasError },
    { 'input--disabled': disabled },
    className,
  );

  return (
    <div className={classes}>
      <label className="input__label">{labelName}</label>
      <div className="input__container">
        {prefixNode}
        <input {...rest} />
        {sufixNode}
      </div>
    </div>
  );
};

export default Input;
