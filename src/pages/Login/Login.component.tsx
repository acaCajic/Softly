import React, { useCallback, useContext, useMemo } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/UI/Button';
import CheckBox from '../../components/UI/CheckBox';
import Input from '../../components/UI/Input';
import {
  composeValidators,
  required,
  validateEmail,
  validatePassword,
} from '../../services/validators';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from '../../components/UI/Spinner';
import GeneralContext from '../../Providers/GeneralProvider/General.context';
import classNames from 'classnames';
import api from '../../api';
import { AxiosError } from 'axios';
import { toastError } from '../../utils';

import './Login.style.scss';
import './Login.style.responsive.scss';
import Field from '../../components/FormWrapper/components/Field';
import FormWrapper from '../../components/FormWrapper';
import InputField from '../../components/Fields/InputField';

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

  const [values, setValues] = useState<FormValues>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  // const [validationMap, setValidationMap] = useState<
  //   Record<keyof FormValues, boolean>
  // >({ email: false, password: false });

  // const isFormValid = useMemo(
  //   () => Object.values(validationMap).every((data) => data),
  //   [validationMap],
  // );

  const handleSubmit = useCallback(
    async (e: FormValues) => {
      try {
        setLoading(true);

        const { email, password } = values;
        const { data } = await api.auth.login(email, password);

        setUser(data.user);
        navigate({ pathname: '/home' });
        localStorage.setItem('token', data.accessToken);
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
          validatePassword('Password is not valid'),
        )}
      />
      {/* <Input
        type="email"
        name="email"
        className="sy-login__input-email"
        labelName="Email"
        placeholder="Contents"
        validateFunction={validateEmail}
        onValidation={(value) =>
          setValidationMap((oldValues) => {
            return {
              ...oldValues,
              email: value,
            };
          })
        }
        onChange={(e) => {
          setValues((oldValues) => ({ ...oldValues, email: e.target.value }));
        }}
      ></Input> */}
      {/* <Input
        type="password"
        name="password"
        className="sy-login__input-password"
        labelName="Password"
        placeholder="Contents"
        onValidation={(value) =>
          setValidationMap((oldValues) => {
            return {
              ...oldValues,
              password: value,
            };
          })
        }
        onChange={(e) => {
          setValues((oldValues) => ({
            ...oldValues,
            password: e.target.value,
          }));
        }}
      /> */}
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
