import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuth === true ? <Component /> : <Redirect to={'/'} />;
      }}
    />
  );
};

export default PrivateRoute;
