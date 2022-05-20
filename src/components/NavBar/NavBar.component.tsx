import React, { useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import GeneralContext from '../../Providers/GeneralProvider/General.context';
import ButtonMenu from '../UI/ButtonMenu';
import { NavLink } from 'react-router-dom';
import { RouteProps } from '../../router/routes';
import Button from '../UI/Button';

import './NavBar.style.scss';
import './NavBar.responsive.style.scss';

export type NavigationBarType = Pick<RouteProps, 'path' | 'title'>;

type NavBarProps = {
  className?: string;
  routes: Array<NavigationBarType>;
};

const NavBar: React.FC<NavBarProps> = (props) => {
  const { className, routes } = props;

  const { logout } = useContext(GeneralContext);

  const [btnIsOpen, setBtnIsOpen] = useState<boolean>(false);

  const classes = classNames('sy-nav', className);

  const renderNavLinks = useMemo(
    () =>
      routes.map((item, index) => {
        return (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              classNames('sy-nav__link', {
                'sy-nav__link--active': isActive,
              })
            }
          >
            {item.title}
          </NavLink>
        );
      }),
    [routes],
  );

  return (
    <div className={classes}>
      <NavLink to="/home">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="sy-nav__logo"
        />
      </NavLink>

      <aside
        className={classNames('sy-nav__sidedrawer', {
          'sy-nav__sidedrawer--active': btnIsOpen,
        })}
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="sy-nav__logo-side-menu"
        />
        {renderNavLinks}
      </aside>

      <div className={classNames('sy-nav__items')}>{renderNavLinks}</div>

      <Button className="sy-nav__logout" onClick={logout}>
        Logout
      </Button>
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
