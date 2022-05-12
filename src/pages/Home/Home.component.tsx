import React, { useContext } from 'react';
import NavBar from '../../components/NavBar';
import Button from '../../components/UI/Button';
import GeneralContext from '../../Providers/GeneralProvider/General.context';

import './Home.styles.scss';

const Home = () => {
  const { logout } = useContext(GeneralContext);
  return (
    <div className="home-page">
      <NavBar></NavBar>
      <Button
        className="logout"
        onClick={logout}
        styleType="primary"
        variant="outline"
      >
        logout
      </Button>
    </div>
  );
};
export default Home;
