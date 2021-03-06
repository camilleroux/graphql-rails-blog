import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { notice, error } from 'actions/flashActions';
import { withRouter } from 'react-router';

export default function withFlashMessage(WrappedComponent) {
  class ComponentWithFlashMessage extends Component {
    static propTypes = {
      notice: PropTypes.func,
      error: PropTypes.func,
      router: PropTypes.object
    }

    constructor(props) {
      super(props);
      this.redirect = this.redirect.bind(this);
    }

    redirect(path, message) {
      this.props.router.push(path);
      if (message && message.error) { this.props.error(message.error); }
      if (message && message.notice) { this.props.notice(message.notice); }
    }

    render() {
      return <WrappedComponent {...this.props} redirect={this.redirect} />;
    }
  }

  return connect(null, { notice, error })(withRouter(ComponentWithFlashMessage));
}
