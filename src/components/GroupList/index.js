import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

function GroupList(props) {

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
      {groupList.map(group => (
        <p key={group.uid}>
          <Link to={`/group/${group.uid}`}>{group.title}</Link>
        </p>
      ))}
    </div>
  );

};

export default withFirebase(GroupList);
