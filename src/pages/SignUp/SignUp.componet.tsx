import React, { useCallback, useContext } from 'react';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/UI/CheckBox';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import api from '../../api';
import { validateEmail, checkPassword } from '../../services/validators';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { toastError } from '../../utils';
import GeneralContext from '../../Providers/GeneralProvider/General.context';

import './SignUp.style.scss';

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
  const { className } = props;

  const classes = classNames('sy-signup', className);

  const { setUser } = useContext(GeneralContext);

  const [values, setValues] = useState<SignUpValues>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { email } = values;
        setLoading(true);

        if (!validateEmail(email)) return;
        const { data } = await api.auth.signup(values);
        localStorage.setItem('token', data.accessToken);
        setUser(data.user);
        navigate({ pathname: '/home' });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toastError(err);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser, values],
  );

  return (
    <form onSubmit={handleSubmit} className={classes}>
      <img
        src="/assets/images/logo.png"
        alt="signUp-logo"
        className="sy-signup__logo"
      />
      <label className="sy-signup__labelCreate">CREATE</label>

      <Input
        type="text"
        name="firstName"
        labelName="First Name"
        placeholder="Contents"
        className="sy-signup__first-name"
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
        className="sy-signup__last-name"
        onChange={(e) =>
          setValues((oldValues) => ({ ...oldValues, lastName: e.target.value }))
        }
      ></Input>

      <Input
        type="text"
        name="email"
        labelName="Email"
        placeholder="Contents"
        className="sy-signup__input-email"
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
        className="sy-signup__input-password"
        //validateFunction={validatePassword}
        onChange={(e) =>
          setValues((oldValues) => ({ ...oldValues, password: e.target.value }))
        }
      ></Input>
      <Input
        type="password"
        name="repeatPassword"
        labelName="Repeat Password"
        placeholder="Contents"
        className="sy-signup__input-repeat-password"
        errMsg="Incorect password"
        validateFunction={(value) => checkPassword(values.password, value)}
        onChange={(e) =>
          setValues((oldValues) => ({
            ...oldValues,
            repeatPassword: e.target.value,
          }))
        }
      ></Input>
      <div className="sy-signup__checkbox-p">
        <CheckBox />
        <p className="sy-signup__p">
          I hereby confirm that I have read and agree to the Terms & Conditions
          and Privacy Policy of Softly.
        </p>
      </div>
      <div className="sy-signup__btn-go">
        <Button type="submit" styleType="primary" variant="outline">
          GO
        </Button>
      </div>
      <div className="sy-signup__btn-login-p">
        <p className="sy-signup__p-alredy-have-account">
          Already have an account?
        </p>
        <Link to="/login" type="button" className="sy-signup__btn-login">
          Login
        </Link>
      </div>
      {loading && <Spinner size="small" />}
    </form>
  );
};

export default SignUp;
