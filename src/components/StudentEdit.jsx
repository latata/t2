import React  from 'react';
import StudentForm from './StudentForm';


function StudentEdit({student, onSubmit}) {
  return (
    <React.Fragment>
      <h2>{student.getFullName()}</h2>
      <StudentForm onSubmit={onSubmit} student={student} />
    </React.Fragment>
  );
}

export default StudentEdit;
