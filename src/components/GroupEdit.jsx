import React  from 'react';
import GroupForm from './GroupForm';

function GroupEdit({group, onSubmit}) {
  return (
    <React.Fragment>
      <h2>{group.code}</h2>
      <GroupForm
        onSubmit={onSubmit}
        group={group}
      />
    </React.Fragment>
  );
}

export default GroupEdit;
