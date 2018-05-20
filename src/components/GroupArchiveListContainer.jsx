import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Group from '../models/Group';
import GroupList from './GroupList';
import Loading from './Loading';

class GroupArchiveListContainer extends Component {
  constructor(props) {
    super(props);

    this.unremoveGroup = this.unremoveGroup.bind(this);

    this.itemActions = [
      {
        type: 'link',
        icon: 'pencil',
        action: group => `/group/${group._id}/edit`,
      },
      {
        type: 'link',
        icon: 'dollar',
        action: group => `/group/${group._id}/payment-check`,
      },
      {
        type: 'button',
        icon: 'trash',
        action: this.unremoveGroup,
      },
    ];

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

  unremoveGroup(group) {
    if (window.confirm('Czy na pewno chcesz cofnąć archiwizację?')) {
      group.$undelete(() => {
        this.fetchGroups();
      });
    }
  }

  fetchGroups() {
    Group.$getAll({
      deleted: '1',
    })
      .then((groups) => {
        this.setState({ groups, ready: true });
      });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <h2 className="d-flex justify-content-between">
          Archiwum grup
        </h2>
        <Link to="/groups">Wróć do aktywnych grup</Link>
        <GroupList groups={this.state.groups} itemActions={this.itemActions} />
      </Loading>
    );
  }
}

export default GroupArchiveListContainer;
