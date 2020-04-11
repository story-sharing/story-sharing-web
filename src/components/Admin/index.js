import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import UserList from '../UserList';

class AdminPage extends Component {

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <UserList />
      </div>
    );
  }

}

const condition = authUser => authUser && authUser.admin;
export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
