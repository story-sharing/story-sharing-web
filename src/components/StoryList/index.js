import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
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

    if (loading) {
      return (
        <div>
          <p>Loading</p>
        </div>
      );
    }

    return (
      <div>
        <h4>Number of stories: {stories.length}</h4>
        <Grid container spacing={3}>
          {stories.map(story => (
            <Grid item sm={12} md={6} lg={4}>
              <StoryListItem story={story} key={story.uid} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

}

export default withFirebase(StoryList);
