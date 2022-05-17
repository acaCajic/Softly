import React from 'react';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

import './Home.styles.scss';

const Home = () => {
  return (
    <div className="home-page">
      <NavBar />
      <Footer></Footer>
    </div>
  );
};
export default Home;
