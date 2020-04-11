import React from 'react';

import GroupList from '../GroupList';
import { withAuthorization } from '../Session';

const GroupsPage = () => (
  <div>
    <h2>Groups</h2>
    <p>List of groups you are in</p>
    <GroupList />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupsPage);
