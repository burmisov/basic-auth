import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../reducers/actions';

function select(state) {
  return {
    test1: state.get('test1'),
    test2: state.get('test2'),
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        {
          React.cloneElement(this.props.children, {
            test1: this.props.test1,
            test2: this.props.test2,
            actions: bindActionCreators(actions, this.props.dispatch),
          })
        }
      </div>
    );
  }
}

App.propTypes = {
  test1: PropTypes.object.isRequired,
  test2: PropTypes.object.isRequired,
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default (connect(select))(App);
