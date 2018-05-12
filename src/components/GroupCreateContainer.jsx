import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GroupCreate from './GroupCreate';

class GroupCreateContainer extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(group) {
    group.$save(() => {
      this.props.history.goBack();
    });
  }

  render() {
    return (
      <GroupCreate onSubmit={this.submit} />
    );
  }
}

export default withRouter(GroupCreateContainer);
