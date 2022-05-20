/* eslint-disable import/no-anonymous-default-export */
import { Asset } from '../models/Asset';
import { LoginResponse } from '../models/Response';
import { SignUpValues } from '../pages/SignUp/SignUp.componet';
import httpClient from './httpClient';

async function login(email: string, password: string) {
  return httpClient.post<LoginResponse>('/users/signin', {
    email,
    password,
  });
}

async function signup(data: SignUpValues) {
  const { email, password, firstName, lastName } = data;
  return httpClient.post('/users/signup', {
    email,
    password,
    firstName,
    lastName,
  });
}
// type ItemsResponse = {
//   liveAssets: Array<Asset>;
//   upcomingAssets: Array<Asset>;
// };

// async function loadingItems() {
//   return httpClient.get<ItemsResponse>('/auctions/gallery');
// }

export default { login, signup };
