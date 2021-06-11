import React from 'react';
import {Redirect} from 'react-router-dom';

export default function UserSignOut() {
  // component calls signOut and updates state after render
  //   useEffect(() => context.actions.signOut());
  // add context as a parameter later

  return (
    <Redirect to="/" />
  );
}
