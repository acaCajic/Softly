import React from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import ArrowIcon from '../../icons/Arrow.icon';
import Login from '../Login/index';
import './Home.styles.scss';

const Home = () => {
  return (
    <div className="home-page">
      <Login />
    </div>
  );
};
export default Home;
