import React, { Component } from 'react';
import Select from 'react-select';
import Group from '../models/Group';
import Student from '../models/Student';
import GroupPaymentCheckItem from './GroupPaymentCheckItem';
import {
  paymentPeriodToTypePeriodMap,
  paymentPeriods,
  defaultPaymentType,
} from '../helpers/payment';

class GroupPaymentCheck extends Component {
  constructor(props) {
    super(props);

    this.paymentPeriodChanged = this.paymentPeriodChanged.bind(this);

    this.state = {
      paymentPeriod: 'oct',
    };
  }

  componentDidMount() {
    const groupId = this.props.match.params.id;
    Promise.all([
      Student.$getAllByGroup(groupId),
      Group.$getById(groupId),
    ])
      .then(([students, group]) => {
        this.setState({
          students,
          group,
        });
      });
  }

  getAmount(paymentType) {
    const paymentPeriod = paymentPeriodToTypePeriodMap[this.state.paymentPeriod][paymentType];

    return this.state.group.pricing.get(`${paymentType}${paymentPeriod}`);
  }

  paymentPeriodChanged(period) {
    this.setState({
      paymentPeriod: period.value,
    });
  }

  updateGroupOptions(index, groupOptions) {
    const groupId = this.props.match.params.id;
    const students = this.state.students.updateIn([index, 'groupsOptions', groupId], item => (item ? item.merge(groupOptions) : groupOptions));

    this.setState({ students });
    students.get(index)
      .$save(() => {
      }, 'groupsOptions');
  }

  render() {
    const groupId = this.props.match.params.id;
    if (!this.state.students || !this.state.group) {
      return null;
    }

    return (
      <div>
        <div className="form-group">
          <label htmlFor="payment-period">Okres</label>
          <Select
            name="payment-period"
            value={this.state.paymentPeriod}
            options={paymentPeriods}
            onChange={this.paymentPeriodChanged}
          />
        </div>
        <table className="table">
          <tbody>
            {this.state.students.map((student, index) => (
              <GroupPaymentCheckItem
                groupOptions={student.groupsOptions.get(groupId)}
                key={student._id}
                student={student}
                amount={this.getAmount(student.getIn(['groupsOptions', groupId, 'paymentType'], defaultPaymentType))}
                updateGroupOptions={groupOptions => this.updateGroupOptions(index, groupOptions)}
                groupId={groupId}
              />))}
          </tbody>
        </table>
      </div>);
  }
}

export default GroupPaymentCheck;
