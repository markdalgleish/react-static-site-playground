import React from 'react';

import BlogPost from '../components/BlogPost';

const getBlogPost = name => require('../../posts/' + name + '.md');

export default class Blog extends React.Component {

  render() {
    const { postName } = this.props.params;

    return (
      <BlogPost html={getBlogPost(postName)} />
    );
  }
};
