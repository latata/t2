import React from 'react';
import { Link } from 'react-router-dom';
import ItemActionButtons from './ItemActionButtons';

function GroupList({ groups, itemActions }) {
  const groupList = groups.map((group, index) => (
    <tr key={group._id}>
      <th scope="row">{index + 1}</th>
      <td>
        <Link to={`/group/${group._id}`}>{group.code}</Link>
        <div className="group-list-details">
          <div className="badge badge-secondary">Liczność: {group.getCurrentSize()}</div>
          <div className="badge badge-secondary">Rok rozpoczęcia: {group.year}</div>
          <div
            className={`badge badge-${group.company === 'LT' ? 'dark' : 'info'}`}
          >
            Firma: {group.company}
          </div>
        </div>
      </td>
      <td>
        <div className="btn-group" role="group" aria-label="Group actions">
          <ItemActionButtons item={group} itemActions={itemActions} />
        </div>
      </td>
    </tr>));

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
          <th scope="col">Code</th>
          <th scope="col">Akcje</th>
        </tr>
      </thead>
      <tbody>
      {groupList}
      </tbody>
    </table>
  );
}

export default GroupList;
