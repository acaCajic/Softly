import React, { useCallback } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import ArrowIcon from '../../icons/Arrow.icon';
import './Login.style.scss';
import api from '../../api';

type FormValues = {
  email?: string;
  password?: string;
};

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const [values, setValues] = useState<FormValues>({});

  // const [userNamee, setUserName] = useState('');
  // const [passwordd, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(values);

      const { email, password } = values;

      const { data } = await api.auth.login(email, password);

      console.log(data);

      // axios.post(``, { values }).then((res: any) => {
      //   console.log(res);
      //   console.log(res.data);
      // });
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
        onChange={(e) => {
          setValues((oldValues) => ({ ...oldValues, email: e.target.value }));
        }}
      ></Input>
      <Input
        type="text"
        name="password"
        className="sy-login__inputPassword"
        labelName="Password"
        placeholder="Contents"
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
        <Button variant="link" className="sy-login__btnSignUp">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Login;
