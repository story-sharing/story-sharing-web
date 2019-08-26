import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import StoryListItem from '../StoryListItem';

class StoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      stories: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .publicStories()
      .onSnapshot(snapshot => {
        let stories = [];
        snapshot.forEach(doc =>
          stories.push({ ...doc.data(), uid: doc.id }),
        );
        this.setState({
          stories,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { stories, loading } = this.state;

    return (
      <div>
        <h4>Number of stories: {stories.length}</h4>
        {stories.map(story => (
          <StoryListItem story={story} />
        ))}
      </div>
    );
  }

}

export default withFirebase(StoryList);
