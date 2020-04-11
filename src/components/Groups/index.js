import React from 'react';

import StoryList from '../StoryList';
import { withAuthorization } from '../Session';

const GroupsPage = () => (
  <div>
    <h2>Groups</h2>
    <p>List of groups you are in</p>
    <StoryList />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupsPage);
