import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Messages from '../Messages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Group(props) {

  const { uid } = useParams();
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = props.firebase
      .group(uid)
      .onSnapshot(doc => {
        setGroup({ ...doc.data(), uid: doc.id });
        setLoading(false);
      });
    return unsubscribe;
  }, [props.firebase, uid]);

  function GroupPage() {
    return (
      <div>
        <h1>{group.title}</h1>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <h3>Chat</h3>
              <Messages group={group} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <h3>Members</h3>
              {group.members.map(member => (
                <p key={member}>{member}</p>
              ))}
              <h3>Stories</h3>
              <p>Bob</p>
              <p>John</p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <p>Loading</p>
    );
  }

  return <GroupPage />;

};

export default withFirebase(Group);
