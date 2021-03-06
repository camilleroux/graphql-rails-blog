import React, { Component, PropTypes, cloneElement, Children } from 'react';

import FlashMessage from 'components/FlashMessage';
import Header from 'containers/layouts/Header';
import withCurrentUser from 'queries/users/currentUserQuery';

import 'assets/stylesheets/styles.scss';
import 'assets/stylesheets/users.scss';
import 'assets/stylesheets/posts.scss';
import 'assets/stylesheets/comments.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  }

  render() {
    const { currentUser, currentUserLoading } = this.props;

    const children = Children.map(this.props.children, (child) => {
      return cloneElement(child, { currentUser, currentUserLoading });
    });

    return (
      <div id="main">
        <Header currentUser={currentUser} currentUserLoading={currentUserLoading} />

        <div className="container">
          <FlashMessage />
          {children}
        </div>
      </div>
    );
  }
}

export default withCurrentUser(App);
