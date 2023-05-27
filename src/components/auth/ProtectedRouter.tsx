import React from 'react'
import { Redirect, Route } from 'react-router-dom';

const ProtectedRouter = ({ children, ...rest}) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isAuthenticated = isLoggedIn ? parseInt(isLoggedIn) : false;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRouter;
