import React from 'react';

import StoryList from '../StoryList';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h2>Home</h2>
    <p>The Home Page is accessible by every signed in user.</p>
    <StoryList />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
