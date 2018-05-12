import React, { Component } from 'react';
import { List } from 'immutable';
import Group from '../models/Group';
import AttendanceList from './AttendanceList';
import Loading from './Loading';

class AttendanceListContainer extends Component {
  static getDerivedStateFromProps(props) {
    return {
      groupId: props.match.params.id,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      group: null,
      students: List(),
      ready: false,
    };
  }

  componentDidMount() {
    this.loadGroup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.groupId !== this.state.groupId) {
      this.loadGroup();
    }
  }

  loadGroup() {
    this.setState({ ready: false });
    Group.$getById(this.state.groupId)
      .then((group) => {
        const students = group.getCurrentStudents();
        this.setState({
          group,
          students,
          ready: true,
        });
      });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <AttendanceList group={this.state.group} students={this.state.students} />
      </Loading>);
  }
}

export default AttendanceListContainer;
