import React, { Component } from 'react';
import Group from '../models/Group';
import GroupList from './GroupList';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Icon from './Icon';

class GroupListContainer extends Component {
  constructor(props) {
    super(props);

    this.removeGroup = this.removeGroup.bind(this);

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
        action: this.removeGroup,
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

  removeGroup(group) {
    if (window.confirm('Czy na pewno chcesz zarchiwizować grupę?')) {
      group.$delete(() => {
        this.fetchGroups();
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
        <h2 className="d-flex justify-content-between">
          Grupy
          <Link to="/group/new" className="btn btn-outline-primary with-label"><Icon
            name="plus" /> Nowa grupa</Link>
        </h2>
        <Link to="/groups/archive">Pokaż archiwum grup</Link>
        <GroupList groups={this.state.groups} itemActions={this.itemActions} />
      </Loading>
    );
  }
}

export default GroupListContainer;
