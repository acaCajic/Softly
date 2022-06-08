import React, { useCallback, useMemo, useState } from 'react';
import { User } from '../../models/User';
import GeneralContext from './General.context';
import { useNavigate } from 'react-router-dom';

type GeneralProvideProps = {
  children?: React.ReactNode;
};
const GeneralProvider: React.FC<GeneralProvideProps> = (props) => {
  const { children } = props;

  const navigate = useNavigate();
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem('user')),
  );

  const isAuthenticate = useMemo(() => !!localStorage.getItem('token'), []);

  const logout = useCallback(() => {
    localStorage.clear();
    navigate({ pathname: 'login' });
  }, [navigate]);

  return (
    <GeneralContext.Provider value={{ user, isAuthenticate, setUser, logout }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
