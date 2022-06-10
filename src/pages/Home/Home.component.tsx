import React from 'react';
import Slider from '../../components/Slider';

import './Home.styles.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <Slider activeLength={3} />
    </div>
  );
};
export default Home;
