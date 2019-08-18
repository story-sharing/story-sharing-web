import React from 'react';

import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
