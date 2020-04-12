import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withFirebase } from '../Firebase';
import StoryListItem from '../StoryListItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

function StoryList(props) {

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const unsubscribe = props.firebase
      .publicStories()
      .onSnapshot(snapshot => {
        let stories = [];
        snapshot.forEach(doc =>
          stories.push({ ...doc.data(), uid: doc.id }),
        );
        setStories(stories);
        setLoading(false);
      });
    return unsubscribe;
  });

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Stories</ListSubheader>
        </GridListTile>
        {stories.map((story) => (
          <StoryListItem story={story} key={story.uid} />
        ))}
      </GridList>
    </div>
  );

}

export default withFirebase(StoryList);
