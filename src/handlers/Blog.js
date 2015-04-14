import React from 'react';

export default class Blog extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  constructor(props, context) {
    super(props);

    this.state = this.getPost(context.router.getCurrentParams().postName);
  }

  getPost(name) {
    return { post: require('../../posts/' + name + '.md') };
  }

  componentWillReceiveProps() {
    this.setState(this.getPost(this.context.router.getCurrentParams().postName));
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.post }}></div>
    );
  }
};
