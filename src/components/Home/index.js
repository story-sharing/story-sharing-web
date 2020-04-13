import React, { useState, useEffect } from 'react';
import StoryList from '../StoryList';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

function HomePage(props) {

  const [loading, setLoading] = useState(true);
  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    const unsubscribe = props.firebase.stories()
      .onSnapshot(snapshot => {
        let stories = [];
        snapshot.forEach(doc =>
          stories.push({ ...doc.data(), uid: doc.id }),
        );
        setStoryList(stories);
        setLoading(false);
      });
    return unsubscribe;
  }, [props.firebase]);

  if (loading) {
    return (
      <p>Loading</p>
    );
  }

  return (
    <div>
      <h2>Home</h2>
      <p>The Home Page is accessible by every signed in user.</p>
      <StoryList stories={storyList} cols={3} />
    </div>
  );

}

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(HomePage));
