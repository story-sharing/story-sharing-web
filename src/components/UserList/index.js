import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserListItem from '../UserListItem';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];
        snapshot.forEach(doc =>
          users.push({ ...doc.data(), uid: doc.id }),
        );
        this.setState({
          users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h4>Number of users: {users.length}</h4>
        {users.map(user => (
          <UserListItem user={user} key={user.uid} />
        ))}
      </div>
    );
  }

}

export default withFirebase(UserList);
