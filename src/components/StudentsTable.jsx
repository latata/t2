import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function StudentsTable({ students }) {
  return (
    <table className="table table-responsive">
      <colgroup>
        <col span="1" style={{ width: '40px' }} />
        <col span="1" style={{ width: '99%' }} />
        <col span="1" style={{ width: '200px' }} />
      </colgroup>
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
        <div className="btn-group" role="group" aria-label="Student actions">
          <Link to={`/student/${student._id}/edit`} className="btn btn-outline-secondary"><Icon name="pencil" /></Link>
          <button onClick={setResigned} className="btn btn-outline-secondary"><Icon name="ban" /></button>
          <button onClick={removeStudent} className="btn btn-outline-secondary"><Icon name="trash" /></button>
        </div>

      </td>
    </tr>);
}
