import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import Icon from './Icon';
import Group from '../models/Group';

class GroupList extends Component {
  constructor(props) {
    super(props);

    this.removeGroup = this.removeGroup.bind(this);

    this.state = {
      groups: [],
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
        this.setState({ groups });
      });
  }

  render() {
    const groups = this.state.groups.map((group, index) => (
      <tr key={group._id}>
        <th scope="row">{index + 1}</th>
        <td><Link to={`/group/${group._id}`}>{group.code}</Link></td>
        <td>{get(group, 'school.name', '')}</td>
        <td>
          <Link to={`/group/${group._id}/edit`}><Icon name="pencil" /></Link>
          <Link to={`/group/${group._id}/payment-check`}><Icon name="dollar" /></Link>
          <a href="ddd" onClick={event => this.removeGroup(group, event)}><Icon name="trash" /></a>
        </td>
      </tr>));

    return (
      <div>
        <h2 className="d-flex justify-content-between">
          Grupy<Link to="/group/new"><Icon name="plus" /></Link>
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">School</th>
              <th scope="col">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {groups}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GroupList;
