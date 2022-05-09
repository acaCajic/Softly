import React, { useCallback } from 'react';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/UI/CheckBox';
import Button from '../../components/UI/Button';
import api from '../../api';
import './SignUp.style.scss';
import {
  validateEmail,
  validatePassword,
  checkPassword,
} from '../../services/validators';

export type SignUpValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

type SignUpProps = {
  className?: string;
};
const SignUp: React.FC<SignUpProps> = (props) => {
  const [values, setValues] = useState<SignUpValues>({});
  const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(values);

      const { firstName, lastName, email, password } = values;

      if (!validateEmail(email)) return;
      console.log('ne radi');
      const { data } = await api.auth.signup(values);
    },
    [values],
  );

  const { className, ...rest } = props;
  return (
    <form onSubmit={handleSubmit} className="sy-signUp">
      <img
        src="/assets/images/logo.png"
        alt="signUp-logo"
        className="sy-signUp__logo"
      />
      <label className="sy-signUp__labelCreate">CREATE</label>

      <Input
        type="text"
        name="firstName"
        labelName="First Name"
        placeholder="Contents"
        className="sy-signUp__firstName"
        onChange={(e) =>
          setValues((oldValues) => ({
            ...oldValues,
            firstName: e.target.value,
          }))
        }
      ></Input>

      <Input
        type="text"
        name="lastName"
        labelName="Last Name"
        placeholder="Contents"
        className="sy-signUp__lastName"
        onChange={(e) =>
          setValues((oldValues) => ({ ...oldValues, lastName: e.target.value }))
        }
      ></Input>

      <Input
        type="text"
        name="email"
        labelName="Email"
        placeholder="Contents"
        className="sy-signUp__inputEmail"
        validateFunction={validateEmail}
        onChange={(e) =>
          setValues((oldValues) => ({ ...oldValues, email: e.target.value }))
        }
      ></Input>

      <Input
        type="password"
        name="password"
        labelName="Password"
        placeholder="Contents"
        className="sy-signUp__inputPassword"
        validateFunction={validatePassword}
        onChange={(e) =>
          setValues((oldValues) => ({ ...oldValues, password: e.target.value }))
        }
      ></Input>
      <Input
        type="password"
        name="repeatPassword"
        labelName="Repeat Password"
        placeholder="Contents"
        className="sy-signUp__inputRepeatPassword"
        errMsg="Incorect password"
        validateFunction={(value) => checkPassword(values.password, value)}
        onChange={(e) =>
          setValues((oldValues) => ({
            ...oldValues,
            repeatPassword: e.target.value,
          }))
        }
      ></Input>
      <div className="sy-signUp__checkBoxP">
        <CheckBox />
        <p className="sy-signUp__p">
          I hereby confirm that I have read and agree to the Terms & Conditions
          and Privacy Policy of Softly.
        </p>
      </div>
      <div className="sy-signUp__btnGo">
        <Button type="submit" styleType="primary" variant="outline">
          GO
        </Button>
      </div>
      <div className="sy-signUp__btnLoginP">
        <p className="sy-signUp__pAlredyHaveAccount">
          Already have an account?
        </p>
        <Link to="/login" type="button" className="sy-signUp__btnLogin">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
