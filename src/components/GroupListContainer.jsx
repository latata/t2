import React, { Component } from 'react';
import Group from '../models/Group';
import GroupList from './GroupList';
import Loading from './Loading';

class GroupListContainer extends Component {
  constructor(props) {
    super(props);

    this.removeGroup = this.removeGroup.bind(this);

    this.state = {
      groups: undefined,
      ready: false,
    };
  }

  componentDidMount() {
    this.fetchGroups();
  }

  componentWillReceiveProps() {
    this.fetchGroups();
  }

  removeGroup(group, event) {
    event.preventDefault();
    if (window.confirm('Czy na pewno chcesz zarchiwizować grupę?')) {
      group.$delete(() => {
        this.fetchGroups(this.props.location.search);
      });
    }
  }

  fetchGroups() {
    Group.$getAll()
      .then((groups) => {
        this.setState({ groups, ready: true });
      });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <GroupList groups={this.state.groups} removeGroup={this.removeGroup} />
      </Loading>
    );
  }
}

export default GroupListContainer;
