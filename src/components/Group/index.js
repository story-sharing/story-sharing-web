import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withFirebase } from '../Firebase';
import StoryList from '../StoryList';
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
  const [storyList, setStoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = props.firebase
      .group(uid)
      .onSnapshot(doc => {
        setGroup({ ...doc.data(), uid: doc.id });
        setLoading(false);
      });
    props.firebase.groupStories(uid)
      .onSnapshot(snapshot => {
        let stories = [];
        snapshot.forEach(doc =>
          stories.push({ ...doc.data(), uid: doc.id }),
        );
        setStoryList(stories);
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
              <StoryList stories={storyList} cols={1} />
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
