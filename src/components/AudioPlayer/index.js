import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from '@material-ui/core/IconButton';
import Playlist from '../Playlist';

export default function AudioPlayer(props) {

  const theme = useTheme();
  const classes = makeStyles(theme => ({
    player: {
      display: 'flex',
      background: 'gray',
      alignItems: 'center',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));

  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState('Initial');
  const [src, setSrc] = useState('/bensound-summer.mp3');

  let audio = React.createRef();

  useEffect(() => {
    document.title = `Now playing: ${title}`;
  });

  const onPlayButtonClick = () => {
    if (playing) {
      setPlaying(false);
      audio.pause();
    } else {
      setPlaying(true);
      audio.play();
    }
  };

  return (
    <div className={classes.player}>
      <div className={classes.controls}>
        <IconButton aria-label="previous">
          {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
        </IconButton>
        <IconButton aria-label="play/pause" onClick={onPlayButtonClick}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton aria-label="next">
          {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
        </IconButton>
      </div>
      <audio src={src} ref={(input) => { audio = input }} />
      <div className={classes.playlist}>
        <h3>Playlist</h3>
        <Playlist />
      </div>
    </div>
  );

}
