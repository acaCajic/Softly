import React from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import ArrowIcon from '../../icons/Arrow.icon';
import './Home.styles.scss';

const Home = () => {
  return (
    <div className="home-page">
      <Input
        className="home-page__input"
        labelName="Password"
        placeholder="content"
        /*onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = 'password')}*/
        prefixNode={<ArrowIcon />}
      />
    </div>
  );
};
export default Home;
