import React, { useCallback } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import EnhancedRoute from '../EnhancedRoute/EnhancedRoute';
import { ExtendedRoute } from '../routes';

const Routes: React.FC<ExtendedRoute> = (props) => {
  const { routes } = props;

  const renderRoutes = useCallback((routes: Array<ExtendedRoute>) => {
    return routes?.map(
      (
        {
          path,
          children,
          index = false,
          routes: subRoutes,
          caseSensitive,
          ...restRoute
        },
        ind,
      ) => {
        return (
          <Route
            key={ind}
            path={path}
            index={index}
            element={<EnhancedRoute {...restRoute} />}
          >
            {subRoutes?.length > 0
              ? renderRoutes(subRoutes)
              : (children as React.ReactNode)}
          </Route>
        );
      },
    );
  }, []);

  return <ReactRoutes>{renderRoutes(routes)}</ReactRoutes>;
};

export default Routes;
