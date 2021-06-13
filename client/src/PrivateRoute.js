import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          // If user is logged in, render component
          render={props => context.authenticatedUser ? (
            <Component {...props} />
          ):
          // Otherwise, redirect to signin
           (
            <Redirect to={{
              pathname: "/signin",
              // Current location of user, added to state
              state: {from: props.location},
            }} />
          )}
        />
      )}
    </Consumer>
  );
};