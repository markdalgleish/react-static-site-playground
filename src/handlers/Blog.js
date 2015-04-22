import React from 'react';

import BlogPost from '../components/BlogPost';

export default class Blog extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor(props, context) {
    super(props);

    this.state = this.getBlogPost(context.router.getCurrentParams().postName);
  }

  getBlogPost(name) {
    return { html: require('../../posts/' + name + '.md') };
  }

  componentWillReceiveProps() {
    this.setState(this.getBlogPost(this.context.router.getCurrentParams().postName));
  }

  render() {
    return (
      <BlogPost html={this.state.html} />
    );
  }
};
