import React, { useCallback, useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import {
  composeValidators,
  mustContainerNumber,
  mustContainLetter,
  required,
  validateEmail,
} from '../../services/validators';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from '../../components/UI/Spinner';
import GeneralContext from '../../Providers/GeneralProvider/General.context';
import Field from '../../components/FormWrapper/components/Field';
import FormWrapper from '../../components/FormWrapper';
import InputField from '../../components/Fields/InputField';
import classNames from 'classnames';
import api from '../../api';
import { AxiosError } from 'axios';
import { toastError } from '../../utils';

import './Login.style.scss';
import './Login.style.responsive.scss';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  email?: string;
  password?: string;
};

type LoginProps = {
  className?: string;
};

const Login: React.FC<LoginProps> = (props) => {
  const { className } = props;

  const classes = classNames('sy-login', className);

  const navigate = useNavigate();
  const { setUser } = useContext(GeneralContext);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setLoading(true);

        const { email, password } = values;
        const { data } = await api.auth.login(email, password);

        localStorage.setItem('token', data.accessToken);

        setUser(data.user);
        navigate('/home', { replace: true });
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toastError(err);
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser],
  );

  return (
    <FormWrapper<FormValues> onSubmit={handleSubmit} className={classes}>
      <div className="sy-login__logo ">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="sy-login__logo"
        />
      </div>
      <label className="sy-login__label-login">LOGIN</label>
      <Field
        name="email"
        component={InputField}
        type="email"
        className="sy-login__input-email"
        labelName="Email"
        placeholder="Contents"
        validate={composeValidators(
          required('This field is required'),
          validateEmail('Email is not valid'),
        )}
      />
      <Field
        name="password"
        component={InputField}
        type="password"
        className="sy-login__input-password"
        labelName="Password"
        placeholder="Contents"
        validate={composeValidators(
          required('This field is required'),
          mustContainerNumber('Password must container number'),
          mustContainLetter('Password must container letter'),
        )}
      />
      <div className="sy-login__checkbox-label">
        <CheckBox
          className="sy-login__checkbox-label__checkbox"
          labelName="Remember Me"
        ></CheckBox>
        <Button
          type="button"
          variant="link"
          className="sy-login__btn-forgot-password"
        >
          Forgot Password?
        </Button>
      </div>
      <div className="sy-login__btn-submit">
        <Button type="submit" styleType="primary" variant="outline">
          Go
        </Button>
        <ToastContainer />
      </div>
      <div className="sy-login__btn-signup-text">
        <span>Don't have an account yet?</span>
        <Link to="/signup" className="sy-login__btn-signup">
          Sign up
        </Link>
      </div>
      {loading && <Spinner size="small" />}
    </FormWrapper>
  );
};

export default Login;
