import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import CheckIcon from '../../../icons/Check.icon';
import './CheckBox.style.scss';

type CheckBoxInput = {
  labelName?: string;
  className?: string;
  icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const CheckBox: React.FC<CheckBoxInput> = (props) => {
  const [checked, setChecked] = useState(false);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }, []);

  const { labelName, className, icon = CheckIcon, ...rest } = props;

  const classes = classNames(
    'checkbox',
    { 'checkbox--set': checked },
    { 'checkbox--unset': !checked },
    className,
  );

  const renderIcon = useCallback((icon: any) => {
    if (typeof icon === 'string') return icon;
    else if (typeof icon === 'object') return icon;
    else {
      const Icon = icon as React.FC;
      return <Icon />;
    }
  }, []);

  return (
    <label className={classes}>
      <input
        hidden
        id="check"
        type="checkbox"
        onChange={onChange}
        checked={checked}
        className="checkbox__input"
        {...rest}
      ></input>

      <span className="checkbox__check">{renderIcon(icon)}</span>
      <span className="checkbox__label">{labelName}</span>
    </label>
  );
};

export default CheckBox;
