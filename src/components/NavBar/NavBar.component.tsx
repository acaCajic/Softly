import React, { useState } from 'react';

import classNames from 'classnames';
import ButtonMenu from '../UI/ButtonMenu';

import './NavBar.style.scss';
import './NavBar.responsive.style.scss';
import { useEffect } from 'react';

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
  const [btnIsOpen, setBtnIsOpen] = useState<boolean>(false);

  const updateBtn =() =>{
    if(window.innerWidth>760)
    setBtnIsOpen(false);
  }

 useEffect(() => {
   //if(window.innerWidth > 760)
    //setBtnIsOpen(false);
    window.addEventListener("resize", updateBtn);
    console.log(window.innerWidth);
 },[]);
  const classes = classNames('nav', className);

  return (
    <div className={classes}>
      <img src="/assets/images/logo.png" alt="logo" className="nav__logo" />
      
        <ul className={btnIsOpen ? 'nav__items-active' : 'nav__items'  }>
          {navItems.map((item, index) => {
            return (
              <li key={index} className="nav__link"><a  href="/" className="nav__item">
                {item.title}
              </a>
              </li>
            );
          })}
        </ul>
      
      <label className="nav__logout">Logout</label>
      <ButtonMenu
        btnOpen={btnIsOpen}
        onClick={() => {
          setBtnIsOpen(!btnIsOpen);
        }}
      />
      <div className='nav__bottom-line'></div>
    </div>
    
  );
};

export default NavBar;
