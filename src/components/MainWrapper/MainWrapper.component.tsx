import React from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';

import './MainWrapper.style.scss';

type MainWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children } = props;
  return (
    <div className="main-wrapper">
      <NavBar />
      <div className="main-wrapper-container">{children}</div>
      <Footer />
    </div>
  );
};

export default MainWrapper;
