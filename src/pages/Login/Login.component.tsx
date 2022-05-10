import React, { useCallback, useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import { validateEmail, validatePassword } from '../../services/validators';
import api from '../../api';

import './Login.style.scss';
import GeneralContext from '../../Providers/GeneralProvider/General.context';

type FormValues = {
  email?: string;
  password?: string;
};

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const { className, ...rest } = props;
  const [values, setValues] = useState<FormValues>({});
  const { setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password } = values;
      const { data } = await api.auth.login(email, password);

      localStorage.setItem('token', data.accessToken);
      setUser(data.user);
      navigate({ pathname: '/home' });
    },
    [navigate, setUser, values],
  );

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
