import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/**
 * PrivateRoute - This checks to see if the user is authenticated before
 *                loading, if not. The are redirected to sign in.
 */

export default function PrivateRoute({ component: Component, ...rest }) {
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