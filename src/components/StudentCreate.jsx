import React  from 'react';
import StudentForm from './StudentForm';

function StudentCreate({ onSubmit, groupId }) {
  return (
    <React.Fragment>
      <h2>Nowy uczeń</h2>
      <StudentForm
        group={groupId}
        onSubmit={onSubmit}
      />
    </React.Fragment>);
}

export default StudentCreate;
