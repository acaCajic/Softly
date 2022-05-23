import React, { useCallback, useState } from 'react';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './ResetPassword.style.scss';

type ResetPasswordProps = {
  className?: string;
};

type ResetPasswordValue = {
  email?: string;
  password?: string;
  repeatPassword?: string;
};
const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const [value, setValue] = useState<ResetPasswordValue>({});
  const { className } = props;
  const classes = classNames('sy-reset-password', className);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(value);
    },
    [value],
  );

  return (
    <form onSubmit={handleSubmit} className={classes}>
      <img
        src="assets/images/logo.png"
        alt="logo"
        className="sy-reset-password__logo"
      />
      <label className="sy-reset-password__reset-label">RESET PASSWORD</label>
      <Input
        type="text"
        name="email"
        className="sy-reset-password__email-input"
        placeholder="Contents"
        labelName="Email"
        onChange={(e) => {
          setValue((oldValue) => ({ ...oldValue, email: e.target.value }));
        }}
      />
      <Input
        type="password"
        name="password"
        className="sy-reset-password__password-input"
        placeholder="Contents"
        labelName="Password"
        onChange={(e) => {
          setValue((oldValue) => ({ ...oldValue, password: e.target.value }));
        }}
      />
      <Input
        type="password"
        name="password"
        className="sy-reset-password__repeat-password-input"
        placeholder="Contents"
        labelName="Repeat Password"
        onChange={(e) => {
          setValue((oldValue) => ({
            ...oldValue,
            repeatPassword: e.target.value,
          }));
        }}
      />
      <div className="sy-reset-password__checkbox-link">
        <CheckBox labelName="Rember Me" />
        <Link className="sy-reset-password__link" to="/login">
          Cancel
        </Link>
      </div>
      <div className="sy-reset-password__btn-go">
        <Button
          type="submit"
          children="GO"
          styleType="primary"
          variant="outline"
        />
      </div>
    </form>
  );
};

export default ResetPassword;
