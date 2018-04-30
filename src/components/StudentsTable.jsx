import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function StudentsTable({ students }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Imię i nazwisko</th>
          <th scope="col">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {students}
      </tbody>
    </table>);
}

export function StudentRow({
  student,
  index,
  setResigned,
  removeStudent,
}) {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td><Link to={`/student/${student._id}`}>{student.getFullName()}</Link>
      </td>
      <td>
        <Link to={`/student/${student._id}/edit`}><Icon name="pencil" /></Link>
        <a href="qwe" onClick={setResigned}><Icon name="ban" /></a>
        <a href="ddd" onClick={removeStudent}><Icon name="trash" /></a>
      </td>
    </tr>);
}
