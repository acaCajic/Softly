import React from 'react';
import { User } from '../../models/User';

type GeneralContextProps = {
  user: User;
  isAuthenticate: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export default React.createContext<GeneralContextProps>({
  user: null,
  isAuthenticate: false,
  setUser: () => {},
  logout: () => {},
});
