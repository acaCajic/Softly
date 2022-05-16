import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import Footer from '../../components/Footer';
import ItemCard from '../../components/ItemCard';
import NavBar from '../../components/NavBar';
import Button from '../../components/UI/Button';
import GeneralContext from '../../Providers/GeneralProvider/General.context';

import './Home.styles.scss';

const Home = () => {
  const { logout } = useContext(GeneralContext);
  return (
    <div className="home-page">
      <NavBar />

      <Button
        className="logout"
        onClick={logout}
        styleType="primary"
        variant="outline"
      >
        logout
      </Button>
      <Footer></Footer>
    </div>
  );
};
export default Home;
