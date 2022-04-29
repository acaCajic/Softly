import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import './CheckBox.style.scss';

type CheckBoxInput = {
  labelName?: string;
  className?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const CheckBox: React.FC<CheckBoxInput> = (props) => {
  const [checked, setChecked] = useState(false);

  /*const onClick = () => {
    let inputCheck = document.getElementById('check');
  };*/

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  }, []);

  const { labelName, className, ...rest } = props;

  const classes = classNames(
    'checkbox',
    { 'checkbox--set': checked === true },
    { 'checkbox--unSet': checked === false },
    className,
  );

  return (
    <label className={classes}>
      <div className={checked ? 'checkbox--set' : 'checkbox--unSet'}>
        <input
          hidden
          id="check"
          type="checkbox"
          onChange={onChange}
          checked={checked}
          className="checkbox__input"
          {...rest}
        ></input>
      </div>
      <span className="checkbox__label">{labelName}</span>
    </label>
  );
};

export default CheckBox;
