import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: `0 auto ${theme.spacing(3)}px auto`,
    padding: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
  button: {
    margin: `${theme.spacing(1)}px 0`,
  },
}));

function Messages(props) {

  const classes = useStyles();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = props.firebase
      .messages(props.group.uid)
      .onSnapshot(snapshot => {
        let messages = [];
        snapshot.forEach(doc =>
          messages.push({ ...doc.data(), uid: doc.id }),
        );
        setMessageList(messages);
      });
    return unsubscribe;
  }, [props.firebase, props.group]);

  return (
    <div className={classes.root}>
      {messageList.map(message => (
        <Paper key={message.uid} className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar>W</Avatar>
            </Grid>
            <Grid item xs>
              <Typography>{message.text}</Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>You</Avatar>
          </Grid>
          <Grid item xs>
            <TextField
              className={classes.textField}
              label="Your Message"
              multiline
              rows={3}
              variant="outlined"
              onChange={e => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
              onClick={() => props.firebase.addMessage(props.group.uid, message)}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );

};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Messages));
