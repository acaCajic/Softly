import React, { useCallback, useContext } from 'react';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/UI/CheckBox';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import api from '../../api';
import {
  validateEmail,
  checkPassword,
  composeValidators,
  mustContainerNumber,
  mustContainLetter,
  required,
} from '../../services/validators';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { AxiosError } from 'axios';
import { toastError } from '../../utils';
import GeneralContext from '../../Providers/GeneralProvider/General.context';
import FormWrapper from '../../components/FormWrapper';
import Field from '../../components/FormWrapper/components/Field';
import InputField from '../../components/Fields/InputField';

import './SignUp.style.scss';
import './SignUp.style.responsive.scss';

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
    async (values: SignUpValues) => {
      // e.preventDefault();
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
    [navigate, setUser],
  );

  return (
    <FormWrapper<SignUpValues> onSubmit={handleSubmit} className={classes}>
      <img
        src="/assets/images/logo.png"
        alt="signUp-logo"
        className="sy-signup__logo"
      />
      <label className="sy-signup__label-create">Sign Up</label>

      <Field
        name="firstName"
        component={InputField}
        type="text"
        className="sy-signup__first-name"
        labelName="First Name"
        placeholder="Contents"
        validate={composeValidators(required('This field is required'))}
      />

      <Field
        name="lastName"
        component={InputField}
        type="text"
        className="sy-signup__last-name"
        labelName="Last Name"
        placeholder="Contents"
        validate={composeValidators(required('This field is required'))}
      />

      <Field
        name="email"
        component={InputField}
        type="email"
        className="sy-signup__input-email"
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
        className="sy-signup__input-password"
        labelName="Password"
        placeholder="Contents"
        validate={composeValidators(
          required('This field is required'),
          mustContainerNumber('Password must container number'),
          mustContainLetter('Password must container letter'),
        )}
      />

      <Field
        name="repeatPassword"
        component={InputField}
        type="password"
        className="sy-signup__input-repeat-password"
        labelName="Password"
        placeholder="Contents"
        validate={composeValidators(
          required('This field is required'),
          mustContainerNumber('Password must container number'),
          mustContainLetter('Password must container letter'),
          checkPassword('Password must match', 'password'),
        )}
      />

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
    </FormWrapper>
  );
};

export default SignUp;
