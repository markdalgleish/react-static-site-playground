import React, { Component } from 'react';
import { provideHooks } from 'redial';

import BlogPost from '../components/BlogPost';

const getBlogPost = name => require('../../posts/' + name + '.md');

const hooks = {
  fetch: ({ dispatch }) => dispatch({ type: 'VIEW_BLOG_POST' })
};

class Blog extends Component {

  render() {
    const { postName } = this.props.params;

    return (
      <BlogPost html={getBlogPost(postName)} />
    );
  }
};

export default provideHooks(hooks)(Blog);
