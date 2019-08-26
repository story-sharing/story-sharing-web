import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class StroyListItem extends Component {

  constructor(props) {
    super(props);
    this.story = props.story
  }

  render() {

    return (
      <Card key={this.story.uid}>
        <CardContent>
          <h2>{this.story.title}</h2>
          <p>{this.story.uid}</p>
        </CardContent>
      </Card>
    );
  }

}

export default StroyListItem;
