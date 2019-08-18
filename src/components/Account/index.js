import React from 'react';
import Grid from '@material-ui/core/Grid';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h2>Account: {authUser.email}</h2>
          <Grid item xs={6}>
            <PasswordChangeForm />
          </Grid>
        </div>
      )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
