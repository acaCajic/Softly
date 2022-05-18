import React, { useMemo } from 'react';
import { RouteProps } from '../../routes';

const EnhancedRoute: React.FC<RouteProps> = (props) => {
  const { element, authorized = false, onlyPublic = false } = props;

  const routeElement = useMemo(() => {
    if (typeof element === 'function') {
      const Element = element as React.FC;
      return <Element />;
    }
  }, [element]);

  return routeElement;
};

export default EnhancedRoute;
