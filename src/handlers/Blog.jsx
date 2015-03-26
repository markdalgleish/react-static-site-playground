var React = require('react');
var { State } = require('react-router');

module.exports = React.createClass({
  mixins: [ State ],

  getPost: function() {
    return require('../../posts/' + this.getParams().postName + '.json');
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
