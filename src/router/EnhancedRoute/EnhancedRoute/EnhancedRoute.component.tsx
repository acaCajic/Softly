import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteProps } from '../../routes';

const EnhancedRoute: React.FC<RouteProps> = (props) => {
  const { element, authorized = false, onlyPublic = false } = props;

  const location = useLocation();

  const routeElement = useMemo(() => {
    if (authorized && !localStorage.getItem('token')) {
      return (
        <Navigate
          to={{ pathname: '/login' }}
          state={{ from: location.pathname }}
          replace
        />
      );
    }

    if (onlyPublic && localStorage.getItem('token')) {
      return <Navigate to="/" />;
    }

    if (typeof element === 'function') {
      const Element = element as React.FC;
      return <Element />;
    }

    return element as React.ReactElement;
  }, [authorized, element, location.pathname, onlyPublic]);

  return routeElement;
};

export default EnhancedRoute;
