import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a onClick={firebase.doSignOut} href="/signout">
    Sign Out
  </a>
);

export default withFirebase(SignOutButton);
