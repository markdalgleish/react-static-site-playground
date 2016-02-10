import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = hits => ({ hits });

class Navigation extends Component {
  render() {
    return (
      <div>Blog post hits: { this.props.hits }</div>
    );
  }
};

export default connect(mapStateToProps)(Navigation);
