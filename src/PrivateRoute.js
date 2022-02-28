import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// check if the user is currently logged in otherwise redirect to the signin page
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/signin',
              state: {from: props.location}
            }} />
          )}
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;