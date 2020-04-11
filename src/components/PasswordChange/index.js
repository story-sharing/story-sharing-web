import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Update Password</Typography>
          <form onSubmit={this.onSubmit}>
            <FormControl fullWidth>
              <TextField
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="New Password"
                margin="normal"
                label="New Password"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm New Password"
                margin="normal"
                label="Confirm New Password"
              />
            </FormControl>
            <Button variant="contained" disabled={isInvalid} type="submit">
              Update
            </Button>
            {error && <p><Typography variant="caption">{error.message}</Typography></p>}
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withFirebase(PasswordChangeForm);
