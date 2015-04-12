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
    return require('../../posts/' + name + '.json');
  }

  componentWillReceiveProps() {
    this.setState(this.getPost(this.context.router.getCurrentParams().postName));
  }

  render() {
    return (
      <div>
        <h1>{ this.state.title }</h1>
        <p>{ this.state.content }</p>
      </div>
    );
  }
};
