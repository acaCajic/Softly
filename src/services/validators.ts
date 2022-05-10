const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
const PASSWORD_REGEX =
  /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

export const validateEmail = (value: string) => {
  return EMAIL_REGEX.test(value);
};

export const validatePassword = (value: string) => {
  return PASSWORD_REGEX.test(value);
};

export const checkPassword = (password: string, repeatPassword: string) => {
  if (password === repeatPassword) return true;
  else return false;
};
