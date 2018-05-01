import React from 'react';
import { Link } from 'react-router-dom';
import './GroupView.css';
import Icon from './Icon';
import StudentsTable, { StudentRow } from './StudentsTable';

function GroupView({
  students,
  resignedStudents,
  group,
  removeStudent,
  setResigned,
}) {
  const studentList = students.map((student, index) =>
    (<StudentRow
      key={student._id}
      student={student}
      index={index}
      setResigned={(event) => {
        setResigned(student, true, event);
      }}
      removeStudent={() => {
        removeStudent(student);
      }}
    />));
  const resignedStudentList = resignedStudents.map((student, index) =>
    (<StudentRow
      key={student._id}
      student={student}
      index={index}
      setResigned={(event) => {
        setResigned(student, false, event);
      }}
      removeStudent={() => {
        removeStudent(student);
      }}
    />));

  return (
    <React.Fragment>
      <h2 className="d-flex justify-content-between align-items-start">
        <div>
          {group.code}
          <div className="btn-group ml-3">
            <Link
              to={`/group/${group._id}/edit`}
              className="btn btn-outline-primary with-label">
              <Icon name="pencil" /> Edycja
            </Link>
            <Link
              to={`/group/${group._id}/payment-check`}
              className="btn btn-outline-primary with-label">
              <Icon name="dollar" /> Zaległości
            </Link>
            <Link
              to={`/group/${group._id}/attendance-list`}
              className="btn btn-outline-primary with-label">
              <Icon name="list" /> List obecności
            </Link>
          </div>
        </div>
        <Link to={`/student/new/${group._id}`} className="btn btn-outline-primary">
          <Icon name="plus" /> Nowy uczeń
        </Link>
      </h2>
      <StudentsTable students={studentList} />
      {resignedStudentList.size && (
        <StudentsTable students={resignedStudentList} /> || null)}
    </React.Fragment>
  );
}

export default GroupView;
