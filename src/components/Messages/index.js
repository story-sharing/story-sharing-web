import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

const useStyles = makeStyles((theme) => ({
  avatars: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  card: {
    margin: theme.spacing(1),
  }
}));

function Messages(props) {

  const classes = useStyles();
  const [messageList, setMessageList] = useState([]);

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
  });

  return (
    <div>
      {messageList.map(message => (
        <Card key={message.uid} className={classes.card}>
          <CardContent>
            {message.text}
          </CardContent>
          <CardActions>
            <div className={classes.avatars}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );

};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(Messages));
