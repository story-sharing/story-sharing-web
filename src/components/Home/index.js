import React from 'react';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../MediaCard';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h2>Home</h2>
    <p>The Home Page is accessible by every signed in user.</p>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <h3>New Stories</h3>
        <MediaCard />
      </Grid>
    </Grid>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
