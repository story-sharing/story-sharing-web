import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class UserListItem extends Component {

  constructor(props) {
    super(props);
    this.user = props.user
  }

  render() {

    return (
      <Card key={this.user.name}>
        <CardContent>
          <p>ID: {this.user.uid}</p>
          <p>E-Mail: {this.user.email}</p>
          <p>Username: {this.user.username}</p>
        </CardContent>
      </Card>
    );
  }

}

export default UserListItem;
