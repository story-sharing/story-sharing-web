import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h2>Sign In</h2>
    <Grid item xs={6}>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Grid>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Card>
        <CardContent>
          <form onSubmit={this.onSubmit}>
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
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                margin="normal"
                label="Password"
              />
            </FormControl>
            <Button variant="contained" disabled={isInvalid} type="submit">
              Sign In
            </Button>
            {error && <p><Typography variant="caption">{error.message}</Typography></p>}
          </form>
        </CardContent>
      </Card>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
