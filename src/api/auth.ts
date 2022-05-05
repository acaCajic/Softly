import httpClient from './httpClient';

async function login(email: string, password: string) {
  return httpClient.post('/users/signin', {
    email,
    password,
  });
}

async function signup(email: string, password: string) {
  return httpClient.post('users/signup', {
    email,
    password,
  });
}

export default { login, signup };
