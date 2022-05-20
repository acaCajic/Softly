import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Footer from '../Footer';
import NavBar from '../NavBar';
import routes from '../../router/routes';

import './MainWrapper.style.scss';
import { NavigationBarType } from '../NavBar/NavBar.component';

type MainWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

const MainWrapper: React.FC<MainWrapperProps> = (props) => {
  const { children } = props;

  const linkNavBar = ['about', 'auctions-gallery', 'expericences'];
  const notShowNavigation = ['/login', '/sign-up'];

  const location = useLocation();

  const routesNavBar = useMemo(
    () =>
      routes
        .filter((route) => !!route.title)
        .map(
          (route) =>
            ({ path: route.path, title: route.title } as NavigationBarType),
        ),
    [],
  );

  // const hideNavigation = useMemo(
  //   () => location.pathname === '/login' || location.pathname === '/sign-up',
  //   [location],
  // );

  const hideNavigation = useMemo(
    () => notShowNavigation.includes(location.pathname),
    [location.pathname, notShowNavigation],
  );

  if (!hideNavigation)
    return (
      <div className="main-wrapper">
        <NavBar routes={routesNavBar} />
        <div className="main-wrapper-container">{children}</div>
        <Footer />
      </div>
    );
  else return children as React.ReactElement;
};

export default MainWrapper;
