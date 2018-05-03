import React, { Component } from 'react';
import get from 'lodash.get';
import { Map } from 'immutable';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {
  defaultPaymentType,
  paymentTypes,
} from '../helpers/payment';
import DiscountEdit from './DiscountEdit';
import Icon from './Icon';

class GroupPaymentCheckItem extends Component {
  static getDerivedStateFromProps(props) {
    const { student } = props;
    const groupOptions = props.groupOptions || Map();
    const sum = student.studentPayments.reduce((prev, payment) => prev + payment.amount, 0);
    let discount = '';

    groupOptions.update('amountDiscount', amountDiscount => amountDiscount || 0);
    groupOptions.update('percentDiscount', percentDiscount => percentDiscount || 0);

    if (groupOptions.get('amountDiscount')) {
      discount += `${groupOptions.get('amountDiscount')} PLN`;
    }
    if (groupOptions.get('percentDiscount')) {
      if (discount) {
        discount += ' / ';
      }
      discount += `${groupOptions.get('percentDiscount')}%`;
    }

    const reducedAmount = (props.amount * (1 - (groupOptions.get('percentDiscount', 0) / 100))) - groupOptions.get('amountDiscount', 0);

    return {
      sum,
      discount,
      reducedAmount,
      groupOptions,
    };
  }

  constructor(props) {
    super(props);

    this.paymentTypeUpdate = this.paymentTypeUpdate.bind(this);
    this.toggleDiscount = this.toggleDiscount.bind(this);
    this.saveDiscounts = this.saveDiscounts.bind(this);

    this.state = {
      discountEdit: false,
    };
  }

  toggleDiscount(e) {
    e.preventDefault();
    this.setState({
      discountEdit: !this.state.discountEdit,
    });
  }

  saveDiscounts(groupOptions, e) {
    e.preventDefault();
    this.props.updateGroupOptions(groupOptions
      .update('amountDiscount', amountDiscount => amountDiscount && parseFloat(amountDiscount))
      .update('percentDiscount', percentDiscount => percentDiscount && parseFloat(percentDiscount)));
    this.setState({
      discountEdit: false,
    });
  }

  paymentTypeUpdate(type) {
    const groupOptions = this.props.groupOptions.set('paymentType', get(type, 'value', defaultPaymentType));
    this.props.updateGroupOptions(groupOptions);
  }

  render() {
    const { student, amount } = this.props;
    const {
      sum,
      groupOptions,
      // reducedAmount,
      discount,
    } = this.state;

    // const classNames = sum >= reducedAmount ? 'green' : 'red';

    return (
      <tr>
        <td><Link to={`/student/${student._id}`}>{student.firstName} {student.lastName}</Link></td>
        <td>
          <Select
            name="form-field-name"
            value={groupOptions.get('paymentType', defaultPaymentType)}
            onChange={this.paymentTypeUpdate}
            options={paymentTypes}
          />
        </td>
        <td>{sum}</td>
        <td>{amount}</td>
        <td>{this.state.discountEdit ?
          <DiscountEdit
            groupOptions={groupOptions}
            onCancel={this.toggleDiscount}
            onSave={this.saveDiscounts}
          /> :
          <span>{discount}
            <a href="asd" onClick={this.toggleDiscount}>
              <Icon name="pencil" />
            </a>
          </span>}
        </td>
      </tr>);
  }
}

export default GroupPaymentCheckItem;
