var React = require('react');
var { State } = require('react-router');

module.exports = React.createClass({
  mixins: [ State ],

  getInitialState: function() {
    return require('../../posts/' + this.getParams().postName + '.json');
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
