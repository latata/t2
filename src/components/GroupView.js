import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import Icon from './Icon';
import Group from '../models/Group';
import StudentsTable, { StudentRow } from './StudentsTable';

class GroupView extends Component {
  constructor(props) {
    super(props);

    this.removeStudent.bind(this);

    this.state = {
      group: null,
      students: [],
      resignedStudents: [],
    };
  }

  static getDerivedStateFromProps(props, currentState) {
    return {
      groupId: props.match.params.id,
    };
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

  componentDidMount() {
    this.loadGroup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.groupId !== this.state.groupId) {
      this.loadGroup();
    }
  }

  setResigned(student, resigned = true) {
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
        setResigned={() => {
          this.setResigned(student);
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
        setResigned={() => {
          this.setResigned(student, false);
        }}
        removeStudent={() => {
          this.removeStudent(student);
        }}
      />));
    return (
      <React.Fragment>
        <h3 className="d-flex justify-content-between">
          <div>
            <span>{get(this, 'state.group.code', '')}
              <small
                className="text-muted"
              >{get(this, 'state.group.name', '')}
              </small>
            </span>
            <span className="ml-2"><Link
              to={`/group/${get(this, 'state.group._id')}/edit`}
            ><Icon
              name="pencil"
            />
            </Link>
            </span>
            <span className="ml-2"><Link
              to={`/group/${get(this, 'state.group._id')}/payment-check`}
            ><Icon
              name="dollar"
            />
            </Link>
            </span>
          </div>
          <Link to={`/student/new/${get(this, 'state.group._id')}`}><Icon
            name="plus"
          />
          </Link>
        </h3>
        <StudentsTable students={students} />
        {resignedStudents && resignedStudents.size && (
          <StudentsTable students={resignedStudents} /> || null)}
      </React.Fragment>
    );
  }
}

export default GroupView;
