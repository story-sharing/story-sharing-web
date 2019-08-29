import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h2>Sign Up</h2>
    <Grid item xs={6}>
      <SignUpForm />
    </Grid>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase store
        return this.props.firebase
          .user(authUser.user.uid)
          .set(
            { username, email, },
            { merge: true, },
          );
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Card>
        <CardContent>
          <form onSubmit={this.onSubmit}>
            <FormControl fullWidth>
              <TextField
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
                margin="normal"
                label="Full Name"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="email"
                value={email}
                onChange={this.onChange}
                type="email"
                placeholder="Email Address"
                margin="normal"
                label="Email Address"
              />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                margin="normal"
                label="Password"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                margin="normal"
                label="Confirm Password"
              />
            </FormControl>
            <Button variant="contained" disabled={isInvalid} type="submit">
              Sign Up
            </Button>
            {error && <p><Typography variant="caption">{error.message}</Typography></p>}
          </form>
        </CardContent>
      </Card>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
