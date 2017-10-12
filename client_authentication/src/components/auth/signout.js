import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>See you soon!</div>
  }
}



export default connect(null, { signoutUser })(Signout);
