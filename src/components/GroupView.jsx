import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GroupView.css';
import Icon from './Icon';
import Group from '../models/Group';
import StudentsTable, { StudentRow } from './StudentsTable';

class GroupView extends Component {
  static getDerivedStateFromProps(props) {
    return {
      groupId: props.match.params.id,
    };
  }

  constructor(props) {
    super(props);

    this.removeStudent.bind(this);

    this.state = {
      group: null,
      students: [],
      resignedStudents: [],
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
        });
      });
  }

  removeStudent(student) {
    if (window.confirm('Czy na pewno chcesz usunąć ucznia?')) {
      student.delete(() => {
        this.loadGroup();
      });
    }
  }

  render() {
    const students = this.state.students.map((student, index) =>
      (<StudentRow
        key={student._id}
        student={student}
        index={index}
        setResigned={(event) => {
          this.setResigned(student, true, event);
        }}
        removeStudent={() => {
          this.removeStudent(student);
        }}
      />));
    const resignedStudents = this.state.resignedStudents.map((student, index) =>
      (<StudentRow
        key={student._id}
        student={student}
        index={index}
        setResigned={(event) => {
          this.setResigned(student, false, event);
        }}
        removeStudent={() => {
          this.removeStudent(student);
        }}
      />));
    return (
      this.state.group && (
        <React.Fragment>
          <h2 className="d-flex justify-content-between align-items-start">
            <div>
              {this.state.group.code}
              <div className="btn-group ml-3">
                <Link to={`/group/${this.state.group._id}/edit`} className="btn btn-outline-primary with-label">
                  <Icon name="pencil" /> Edycja
                </Link>
                <Link to={`/group/${this.state.group._id}/payment-check`} className="btn btn-outline-primary with-label">
                  <Icon name="dollar" /> Zaległości
                </Link>
                <Link to={`/group/${this.state.group._id}/attendance-list`} className="btn btn-outline-primary with-label">
                  <Icon name="list" /> List obecności
                </Link>
              </div>
            </div>
            <Link to={`/student/new/${this.state.group._id}`} className="btn btn-outline-primary">
              <Icon name="plus" /> Nowy uczeń
            </Link>
          </h2>
          <StudentsTable students={students} />
          {resignedStudents && resignedStudents.size && (
            <StudentsTable students={resignedStudents} /> || null)}
        </React.Fragment>
      )
    );
  }
}

export default GroupView;
