import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Group(props) {

  const { uid } = useParams();
  const [group, setGroup] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = props.firebase
      .group(uid)
      .onSnapshot(doc => {
        setGroup(doc.data());
      });
    return unsubscribe;
  });

  return (
    <div>
      <h1>{group.title}</h1>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <h3>Chat</h3>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3>Members</h3>
            <p>Bob</p>
            <p>John</p>
            <h3>Stories</h3>
            <p>Bob</p>
            <p>John</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );

};

export default withFirebase(Group);
