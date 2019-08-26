import React from 'react';
import Grid from '@material-ui/core/Grid';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h2>{authUser.username}</h2>
          <h4>{authUser.email}</h4>
          <h4>{authUser.uid}</h4>
          <p>Admin: {JSON.stringify(authUser.admin)}</p>
          <Grid item xs={6}>
            <PasswordChangeForm />
          </Grid>
        </div>
      )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
