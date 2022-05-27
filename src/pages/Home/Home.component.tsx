import React from 'react';
import { useContext } from 'react';
import GeneralContext from '../../Providers/GeneralProvider/General.context';

import './Home.styles.scss';

const Home: React.FC = () => {
  const { user } = useContext(GeneralContext);
  console.log('user in home', user);
  return <div className="home-page"></div>;
};
export default Home;
