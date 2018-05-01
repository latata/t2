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
        <td>
          <Link to={`/group/${group._id}`}>{group.code}</Link>
          <div className="group-list-details">
            <div className="badge badge-secondary">Liczność: {group.getCurrentSize()}</div>
            <div className="badge badge-secondary">Rok rozpoczęcia: {group.year}</div>
            <div className={`badge badge-${group.company === 'LT' ? 'dark' : 'info'}`}>Firma: {group.company}</div>
          </div>
        </td>
        <td>
          <div className="btn-group" role="group" aria-label="Group actions">
            <Link to={`/group/${group._id}/edit`} className="btn btn-outline-secondary"><Icon name="pencil" /></Link>
            <Link to={`/group/${group._id}/payment-check`} className="btn btn-outline-secondary"><Icon name="dollar" /></Link>
            <button type="button" className="btn btn-outline-secondary" onClick={event => this.removeGroup(group, event)}><Icon name="trash" /></button>
          </div>
        </td>
      </tr>));

    return (
      <React.Fragment>
        <h2 className="d-flex justify-content-between">
          Grupy
          <Link to="/group/new" className="btn btn-outline-primary with-label"><Icon name="plus" /> Nowa grupa</Link>
        </h2>
        <table className="table table-responsive">
          <colgroup>
            <col span="1" style={{width: '40px'}} />
            <col span="1" style={{width: '99%'}} />
            <col span="1" style={{width: '200px'}} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {groups}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default GroupList;
