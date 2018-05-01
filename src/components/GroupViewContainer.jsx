import React, { Component } from 'react';
import Group from '../models/Group';
import Loading from './Loading';
import GroupView from './GroupView';

class GroupViewContainer extends Component {
  static getDerivedStateFromProps(props) {
    return {
      groupId: props.match.params.id,
    };
  }

  constructor(props) {
    super(props);

    this.removeStudent = this.removeStudent.bind(this);
    this.setResigned = this.setResigned.bind(this);

    this.state = {
      group: null,
      students: [],
      resignedStudents: [],
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

  setResigned(student, resigned = true, event) {
    event.preventDefault();

    const message = resigned ?
      'Czy na pewno chcesz ustawić ucznia jako wypisany z zajęć (rezygnacja)?' :
      'Czy na pewno chcesz wpisać ucznia z powrotem do grupy?';

    if (window.confirm(message)) {
      student.setResigned(this.state.groupId, resigned)
        .$save(() => {
          this.loadGroup();
        }, 'groupsOptions');
    }
  }

  loadGroup() {
    Group.$getById(this.state.groupId)
      .then((group) => {
        const students = group.getCurrentStudents();
        const resignedStudents = group.getResignedStudents();
        this.setState({
          group,
          students,
          resignedStudents,
          ready: true,
        });
      });
  }

  removeStudent(student) {
    if (window.confirm('Czy na pewno chcesz usunąć ucznia?')) {
      student.$delete(() => {
        this.loadGroup();
      });
    }
  }

  render() {
    const {
      group,
      students,
      resignedStudents,
      ready,
    } = this.state;

    return (
      <Loading ready={ready}>
        <GroupView
          group={group}
          students={students}
          resignedStudents={resignedStudents}
          removeStudent={this.removeStudent}
          setResigned={this.setResigned}
        />
      </Loading>);
  }
}

export default GroupViewContainer;
