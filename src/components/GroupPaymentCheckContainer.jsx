import React, { Component } from 'react';
import Group from '../models/Group';
import Student from '../models/Student';
import {
  paymentPeriodToTypePeriodMap,
} from '../helpers/payment';
import Loading from './Loading';
import GroupPaymentCheck from './GroupPaymentCheck';

class GroupPaymentCheckContainer extends Component {
  constructor(props) {
    super(props);

    this.paymentPeriodChanged = this.paymentPeriodChanged.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.updateGroupOptions = this.updateGroupOptions.bind(this);

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
          ready: true,
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
    return (
      <Loading ready={this.state.ready}>
        <GroupPaymentCheck
          group={this.state.group}
          students={this.state.students}
          paymentPeriod={this.state.paymentPeriod}
          paymentPeriodChanged={this.paymentPeriodChanged}
          getAmount={this.getAmount}
          updateGroupOptions={this.updateGroupOptions}
        />
      </Loading>
    );
  }
}

export default GroupPaymentCheckContainer;
