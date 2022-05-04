import httpClient from './httpClient';

async function login(email: string, password: string) {
  return httpClient.post('/users/signin', {
    email,
    password,
  });
}

async function signup(params: any) {}

export default { login, signup };
