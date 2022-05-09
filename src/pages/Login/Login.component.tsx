import React, { useCallback } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import { validateEmail, validatePassword } from '../../services/validators';
import api from '../../api';

import './Login.style.scss';

type FormValues = {
  email?: string;
  password?: string;
};

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const [values, setValues] = useState<FormValues>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(values);

      const { email, password } = values;

      const { data } = await api.auth.login(email, password);

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('token1', 'joca_zmaj');
    },
    [values],
  );

  const { className, ...rest } = props;
  return (
    <form onSubmit={handleSubmit} className="sy-login">
      <div className="sy-login__logo ">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="sy-login__logo"
        />
      </div>
      <label className="sy-login__labelLogin">LOGIN</label>
      <Input
        type="text"
        name="email"
        className="sy-login__inputEmail"
        labelName="Email"
        placeholder="Contents"
        validateFunction={validateEmail}
        onChange={(e) => {
          setValues((oldValues) => ({ ...oldValues, email: e.target.value }));
        }}
      ></Input>
      <Input
        type="password"
        name="password"
        className="sy-login__inputPassword"
        labelName="Password"
        placeholder="Contents"
        //validateFunction={validatePassword}
        onChange={(e) => {
          setValues((oldValues) => ({
            ...oldValues,
            password: e.target.value,
          }));
        }}
      />
      <div className="sy-login__checkBox_Label">
        <CheckBox
          className="sy-login__checkBoxAndLabel__checkBox"
          labelName="Remember Me"
        ></CheckBox>
        <Button
          type="button"
          variant="link"
          className="sy-login__btnForgotPassword"
        >
          Forgot Password?
        </Button>
      </div>
      <div className="sy-login__btnSubmit">
        <Button type="submit" styleType="primary" variant="outline">
          Go
        </Button>
      </div>
      <div className="sy-login__btnSignUp_Text">
        Don't have an account yet?
        <Link to="/signup" className="sy-login__btnSignUp">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
