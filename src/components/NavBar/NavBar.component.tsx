import React, { useState } from 'react';

import classNames from 'classnames';
import ButtonMenu from '../UI/ButtonMenu';

import './NavBar.style.scss';
import './NavBar.responsive.style.scss';

type NavBarProps = {
  className?: string;
};

const navItems = [
  { title: 'ABOUT' },
  { title: 'AUCTIONS' },
  { title: 'EXPERIENCES' },
];

const NavBar: React.FC<NavBarProps> = (props) => {
  const { className } = props;

  const classes = classNames('nav', className);

  const [btnIsOpen, setBtnIsOpen] = useState<boolean>(false);

  return (
    <div className={classes}>
      <img src="/assets/images/logo.png" alt="logo" className="nav__logo" />
      <div className="nav__items">
        <ul>
          {navItems.map((item, index) => {
            return (
              <a key={index} href="/" className="nav__item">
                {item.title}
              </a>
            );
          })}
        </ul>
      </div>
      <label className="nav__logout">Logout</label>
      <ButtonMenu
        btnOpen={btnIsOpen}
        onClick={() => {
          setBtnIsOpen(!btnIsOpen);
        }}
      />
    </div>
  );
};

export default NavBar;
