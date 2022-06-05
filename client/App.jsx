import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes, {
          appHandleEvents: () => {},
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default {
  component: connect(mapStateToProps, {})(App),
};
