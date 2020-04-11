import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withFirebase } from '../Firebase';

function Group(props) {

  const { uid } = useParams();
  const [group, setGroup] = useState({});

  useEffect(() => {
    const unsubscribe = props.firebase
      .group(uid)
      .onSnapshot(doc => {
        setGroup(doc.data());
      });
    return unsubscribe;
  });

  return (
    <div>
      <h1>Group: {group.title}</h1>
    </div>
  );

};

export default withFirebase(Group);
