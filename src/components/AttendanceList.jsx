import React, { Component } from 'react';
import { List } from 'immutable';
import Icon from './Icon';
import Group from '../models/Group';

const itemsPerPage = 29;

class AttendanceList extends Component {
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
    Group.$getById(this.state.groupId)
      .then((group) => {
        const students = group.getCurrentStudents();
        this.setState({
          group,
          students,
        });
      });
  }

  render() {
    const students = this.state.students.map((student, index) =>
      (
        <tr key={student._id}>
          <td>{student.getFullName()}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>));
    const emptyItems = [...Array(itemsPerPage - (this.state.students.size % itemsPerPage))].map((item, index) =>
      <tr key={index}>
        <td>&nbsp;</td>
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>);
    return (
      this.state.group && (
        <React.Fragment>
          <h2 className="d-flex justify-content-between align-items-start">
            {this.state.group.code}
            <button
              className="btn btn-outline-primary with-label d-print-none"
              onClick={() => window.print()}
            >
              <Icon name="print" />
              Drukuj
            </button>
          </h2>
          <table className="table table-bordered">
            <colgroup>
              <col span="1" style={{ width: '200px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
              <col span="1" style={{ width: '40px' }} />
            </colgroup>
            <tbody>
              {students}
              {emptyItems}
            </tbody>
          </table>
        </React.Fragment>
      )
    );
  }
}

export default AttendanceList;
