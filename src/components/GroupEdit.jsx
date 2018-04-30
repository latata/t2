import React, { Component } from 'react';
import get from 'lodash.get';
import 'react-select/dist/react-select.css';
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
      <div className="m-3"><h3>{get(this, 'state.group.code')}</h3><GroupForm
        onSubmit={this.submit}
        group={this.state.group}
      />
      </div>);
  }
}

export default withRouter(GroupEdit);
