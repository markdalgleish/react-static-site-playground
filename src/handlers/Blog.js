var React = require('react');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  getPost: function() {
    return require('../../posts/' + this.context.router.getCurrentParams().postName + '.json');
  },

  getInitialState: function() {
    return this.getPost();
  },

  componentWillReceiveProps: function() {
    this.setState(this.getPost());
  },

  render: function() {
    return (
      <div>
        <h1>{ this.state.title }</h1>
        <p>{ this.state.content }</p>
      </div>
    );
  }
});
