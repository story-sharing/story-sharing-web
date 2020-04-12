import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

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

function GroupsPage(props) {

  const classes = useStyles();
  let history = useHistory();
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const unsubscribe = props.firebase
      .groups(props.firebase.auth.uid)
      .onSnapshot(snapshot => {
        let groups = [];
        snapshot.forEach(doc =>
          groups.push({ ...doc.data(), uid: doc.id }),
        );
        setGroupList(groups);
      });
    return unsubscribe;
  });

  return (
    <div>
      <h1>Groups</h1>
      {groupList.map(group => (
        <Card key={group.uid} className={classes.card}>
          <CardActionArea onClick={() => history.push(`${ROUTES.GROUPS}/${group.uid}`)}>
            <CardMedia
              component="img"
              alt={group.title}
              height="140"
              image={group.image}
              title={group.title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {group.title}
              </Typography>
              <div className={classes.avatars}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              {group.members}
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );

};

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(GroupsPage));
