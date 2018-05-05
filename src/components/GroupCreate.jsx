import React from 'react';
import GroupForm from './GroupForm';

function GroupCreate({ onSubmit }) {
  return (
    <React.Fragment>
      <h2>Nowa grupa</h2>
      <GroupForm onSubmit={onSubmit} />
    </React.Fragment>
  );
}

export default GroupCreate;
