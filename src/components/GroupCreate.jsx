import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GroupForm from './GroupForm';

class GroupCreate extends Component {
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
      <React.Fragment>
        <h2>Nowa grupa</h2>
        <GroupForm onSubmit={this.submit} />
      </React.Fragment>);
  }
}

export default withRouter(GroupCreate);
