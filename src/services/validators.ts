import { FieldValidator } from '../components/FormWrapper/components/Field/Field.components';

const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
const PASSWORD_REGEX =
  /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

const MUST_CONTAIN_LETTER = /(?=.*?[a-z, A-Z])/;
const MUST_CONTAIN_NUMBER = /(?=.*?[0-9])/;

const VALID: any = undefined;

export const required = (errMessage: string) => (value: any) => {
  if (typeof value === 'string') {
    return value !== '' ? VALID : errMessage;
  }
};

export const mustContainerNumber = (errorMessage: string) => (value: any) => {
  return MUST_CONTAIN_NUMBER.test(value) ? VALID : errorMessage;
};

export const mustContainLetter = (errorMessage: string) => (value: any) => {
  return MUST_CONTAIN_LETTER.test(value) ? VALID : errorMessage;
};

export const validateEmail = (errMessage: string) => (value: string) => {
  return EMAIL_REGEX.test(value) ? VALID : errMessage;
};

export const validatePassword = (errMessage: string) => (value: string) => {
  return PASSWORD_REGEX.test(value) ? VALID : errMessage;
};

export const checkPassword =
  (errMessage: string, otherField: string) =>
  (value: string, allValues: Record<string, any>) => {
    if (allValues[otherField] === value) return VALID;
    else return errMessage;
  };

/*export const checkPassword = (password: string, repeatPassword: string) => {
  if (password === repeatPassword) return true;
  else return false;
};*/

export const composeValidators =
  (...validators: Array<FieldValidator<any>>) =>
  (value: any, allValues: Record<string, any>) => {
    return validators.reduce(
      (errorMessage, validate) => errorMessage || validate(value, allValues),
      undefined,
    );
  };
