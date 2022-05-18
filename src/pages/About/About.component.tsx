import React from 'react';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

import './About.style.scss';

const About: React.FC = () => {
  return (
    <div className="sy-about">
      <NavBar />
      <div className="container"></div>
      <Footer />
    </div>
  );
};

export default About;
