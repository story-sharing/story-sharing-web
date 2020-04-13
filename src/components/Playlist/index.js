import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withFirebase } from '../Firebase';

const useStyles = makeStyles((theme) => ({
  playlist: {
    maxHeight: '200px',
  }
}));

function Playlist(props) {

  const [stories, setStories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = props.firebase
      .playlist()
      .onSnapshot(snapshot => {
        let stories = [];
        snapshot.forEach(doc =>
          doc.data().story.get().then(res => {
            stories.push({ ...res.data(), uid: res.id });
            setStories(stories);
          })
        );
      });
    return unsubscribe;
  }, [props.firebase]);

  return (
    <List dense={true} className={classes.playlist}>
      {stories.map((story) => (
        <ListItem key={story.uid}>
          <ListItemAvatar>
            <Avatar alt={story.title} src={story.image} />
          </ListItemAvatar>
          <ListItemText primary={story.title} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );

};

export default withFirebase(Playlist);
