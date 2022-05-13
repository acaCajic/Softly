import React, { useMemo, useState } from 'react';

import classNames from 'classnames';
import ButtonMenu from '../UI/ButtonMenu';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.style.scss';
import './NavBar.responsive.style.scss';

type NavBarProps = {
  className?: string;
};

const navItems = [
  { title: 'ABOUT', to: '/about' },
  { title: 'AUCTIONS', to: '/auctions' },
  { title: 'EXPERIENCES', to: '/experiences' },
];

const NavBar: React.FC<NavBarProps> = (props) => {
  const { className } = props;
  const [btnIsOpen, setBtnIsOpen] = useState<boolean>(false);

  const classes = classNames('sy-nav', className);

  const renderNavLinks = useMemo(
    () =>
      navItems.map((item, index) => {
        return (
          <Link to={item.to} key={index} className="sy-nav__link">
            {item.title}
          </Link>
        );
      }),
    [],
  );

  return (
    <div className={classes}>
      <img src="/assets/images/logo.png" alt="logo" className="sy-nav__logo" />

      <aside
        className={classNames('sy-nav__sidedrawer', {
          'sy-nav__sidedrawer--active': btnIsOpen,
        })}
      >
        {renderNavLinks}
      </aside>

      <div className={classNames('sy-nav__items')}>{renderNavLinks}</div>

      <label className="sy-nav__logout">Logout</label>
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
