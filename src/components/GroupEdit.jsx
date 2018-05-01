import React, { Component } from 'react';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';
import GroupForm from './GroupForm';
import Group from '../models/Group';

class GroupEdit extends Component {
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
        this.setState({ group });
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
      <React.Fragment>
        <h2>{get(this, 'state.group.code')}</h2>
        <GroupForm
          onSubmit={this.submit}
          group={this.state.group}
        />
      </React.Fragment>);
  }
}

export default withRouter(GroupEdit);
