import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function StoryListItem(props) {

  const classes = useStyles();

  return (
    <GridListTile key={props.story.uid}>
      <img src="https://material-ui.com/static/images/grid-list/breakfast.jpg" alt={props.story.title} />
      <GridListTileBar
        title={props.story.title}
        subtitle={<span>by: {props.story.owners}</span>}
        actionIcon={
          <IconButton aria-label={`info about ${props.story.title}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );

}
