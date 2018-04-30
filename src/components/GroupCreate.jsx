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
      <div className="m-3"><h3>Nowa grupa</h3><GroupForm onSubmit={this.submit} /></div>);
  }
}

export default withRouter(GroupCreate);
