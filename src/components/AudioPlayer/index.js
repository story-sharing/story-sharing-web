import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import IconButton from '@material-ui/core/IconButton';
import Playlist from '../Playlist';

export default function AudioPlayer(props) {

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
    <div>
      <Box textAlign="center">
        {props.open &&
          <IconButton aria-label="previous">
            <SkipPreviousIcon />
          </IconButton>
        }
        <IconButton aria-label="play/pause" onClick={onPlayButtonClick}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        {props.open &&
          <IconButton aria-label="next">
            <SkipNextIcon />
          </IconButton>
        }
      </Box>
      <audio src={src} ref={(input) => { audio = input }} />
      <Playlist open={props.open} />
    </div>
  );

}
