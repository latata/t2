import React from 'react';
import Select from 'react-select';
import GroupPaymentCheckItem from './GroupPaymentCheckItem';
import {
  paymentPeriods,
  defaultPaymentType,
} from '../helpers/payment';

function GroupPaymentCheck({
  group,
  students,
  paymentPeriod,
  paymentPeriodChanged,
  getAmount,
  updateGroupOptions,
}) {
  const groupId = group._id;

  return (
    <React.Fragment>
      <h2>{group.code}&nbsp;
        <small className="text-muted">Weryfikacja płatności</small>
      </h2>
      <div className="form-group">
        <label htmlFor="payment-period">Okres</label>
        <Select
          name="payment-period"
          value={paymentPeriod}
          options={paymentPeriods}
          onChange={paymentPeriodChanged}
        />
      </div>
      <table className="table">
        <tbody>
          {students.map((student, index) => (
            <GroupPaymentCheckItem
              groupOptions={student.groupsOptions.get(groupId)}
              key={student._id}
              student={student}
              amount={getAmount(student.getIn(['groupsOptions', groupId, 'paymentType'], defaultPaymentType))}
              updateGroupOptions={groupOptions => updateGroupOptions(index, groupOptions)}
              groupId={groupId}
            />))}
        </tbody>
      </table>
    </React.Fragment>);
}

export default GroupPaymentCheck;
