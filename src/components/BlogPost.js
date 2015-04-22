import React from 'react';

export default class BlogPost extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
    );
  }
};
