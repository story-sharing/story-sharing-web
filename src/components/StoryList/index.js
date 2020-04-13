import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withFirebase } from '../Firebase'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function StoryList(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cols={props.cols}>
        <GridListTile key="Subheader" cols={props.cols} style={{ height: 'auto' }}>
          <ListSubheader component="div">Stories</ListSubheader>
        </GridListTile>
        {props.stories.length === 0 &&
          <p>None yet, why not make one?</p>
        }
        {props.stories.map((story) => (
          <GridListTile key={story.title}>
            <img src={story.image} alt={story.title} />
            <GridListTileBar
              title={story.title}
              subtitle={<span>by: {story.owners}</span>}
              actionIcon={
                <IconButton
                aria-label={`Add ${story.title} to playlist`}
                className={classes.icon}
                onClick={() => props.firebase.addToPlaylist(story.ref)}>
                  <PlaylistAddIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}

export default withFirebase(StoryList);
