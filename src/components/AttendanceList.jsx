import React  from 'react';
import Icon from './Icon';

const itemsPerPage = 29;

function AttendanceList({ students, group }) {
  const studentList = students.map(student =>
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
  const emptyItems = [
    ...Array(itemsPerPage - (students.size % itemsPerPage))].map((item, index) =>
    (
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
      </tr>));
  return (
    <React.Fragment>
      <h2 className="d-flex justify-content-between align-items-start">
        {group.code}
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
          {studentList}
          {emptyItems}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default AttendanceList;
