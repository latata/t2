import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Group from '../models/Group';
import GroupEdit from './GroupEdit';
import Loading from './Loading';

class GroupEditContainer extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      group: null,
    };
  }

  componentDidMount() {
    Group.$getById(this.props.match.params.id)
      .then((group) => {
        this.setState({ group, ready: true });
      });
  }

  submit(group) {
    this.setState({ group });
    group.$save(() => {
      this.props.history.goBack();
    });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <GroupEdit group={this.state.group} onSubmit={this.submit} />
      </Loading>);
  }
}

export default withRouter(GroupEditContainer);
