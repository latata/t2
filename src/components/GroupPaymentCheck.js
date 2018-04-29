import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Map } from 'immutable';
import get from 'lodash.get';
import Icon from './Icon';
import Group from '../models/Group';
import Student from '../models/Student';

const defaultPaymentType = 'r9';

const paymentTypes = [
  {
    value: 'r9',
    label: '9 rat',
  },
  {
    value: 'r4',
    label: '4 raty',
  },
  {
    value: 'r2',
    label: '2 raty',
  },
  {
    value: 'r1',
    label: '1 rata',
  },
];

const paymentPeriods = [
  {
    value: 'oct',
    label: 'do 10 października',
  },
  {
    value: 'nov',
    label: 'do 10 listopada',
  },
  {
    value: 'dec',
    label: 'do 10 grudnia',
  },
  {
    value: 'jan',
    label: 'do 10 stycznia',
  },
  {
    value: 'feb',
    label: 'do 10 lutego',
  },
  {
    value: 'mar',
    label: 'do 10 marca',
  },
  {
    value: 'apr',
    label: 'do 10 kwietnia',
  },
  {
    value: 'may',
    label: 'do 10 maja',
  },
];

const paymentPeriodToTypePeriodMap = {
  oct: {
    r9: 'oct',
    r4: 'oct',
    r2: 'oct',
    r1: 'oct',
  },
  nov: {
    r9: 'nov',
    r4: 'nov',
    r2: 'oct',
    r1: 'oct',
  },
  dec: {
    r9: 'dec',
    r4: 'nov',
    r2: 'oct',
    r1: 'oct',
  },
  jan: {
    r9: 'jan',
    r4: 'jan',
    r2: 'jan',
    r1: 'oct',
  },
  feb: {
    r9: 'feb',
    r4: 'jan',
    r2: 'jan',
    r1: 'oct',
  },
  mar: {
    r9: 'mar',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
  apr: {
    r9: 'apr',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
  may: {
    r9: 'may',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
};

class DiscountEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.inputChanged = this.inputChanged.bind(this);
  }

  static getDerivedStateFromProps(props, currentState) {
    return {
      groupOptions: props.groupOptions,
    };
  }

  inputChanged(event) {
    const groupOptions = this.state.groupOptions.set(event.target.name, event.target.value);
    this.setState({ groupOptions });
  }

  render() {
    const { onCancel, onSave } = this.props;
    return (<form onSubmit={onSave.bind(null, this.state.groupOptions)}>
      <input
        className="form-control"
        name="amountDiscount"
        value={this.state.groupOptions.get('amountDiscount', 0)}
        onChange={this.inputChanged}
        style={{ width: '70px' }}
        placeholder="PLN"
      />
      <input
        className="form-control"
        name="percentDiscount"
        value={this.state.groupOptions.get('percentDiscount', 0)}
        onChange={this.inputChanged}
        style={{ width: '70px' }}
        placeholder="%"
      />
      <button type="button" className="btn btn-sm" onClick={onCancel}><Icon name="ban" /></button>
      <button type="submit" className="btn btn-sm"><Icon name="circle-check" /></button>
            </form>);
  }
}

class GroupPaymentCheckItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      discountEdit: false,
    };
  }

  static getDerivedStateFromProps(props, currentState) {
    const student = props.student;
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

    const reducedAmount = (props.amount * (1 - groupOptions.get('percentDiscount', 0) / 100)) - groupOptions.get('amountDiscount', 0);

    return {
      sum,
      discount,
      reducedAmount,
      groupOptions,
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
    groupOptions = groupOptions
      .update('amountDiscount', amountDiscount => amountDiscount && parseFloat(amountDiscount))
      .update('percentDiscount', percentDiscount => percentDiscount && parseFloat(percentDiscount));
    this.props.updateGroupOptions(groupOptions);
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
      sum, groupOptions, reducedAmount, discount,
    } = this.state;

    const classNames = sum >= reducedAmount ? 'green' : 'red';

    return (<tr className={classNames}>
      <td><Link to={`/student/${student._id}`}>{student.firstName} {student.lastName}</Link>
      </td>
      <td><Select
        name="form-field-name"
        value={groupOptions.get('paymentType', defaultPaymentType)}
        onChange={this.paymentTypeUpdate.bind(this)}
        options={paymentTypes}
      />
      </td>
      <td>{sum}</td>
      <td>{amount}</td>
      <td>{this.state.discountEdit ?
        <DiscountEdit
          groupOptions={groupOptions}
          onCancel={this.toggleDiscount.bind(this)}
          onSave={this.saveDiscounts.bind(this)}
        /> :
        <span>{discount} <a href="asd" onClick={this.toggleDiscount.bind(this)}><Icon
          name="pencil"
        />
        </a>
        </span>}
      </td>
            </tr>);
  }
}

class GroupPaymentCheck extends Component {
  constructor(props) {
    super(props);

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

  getAmount(paymentType) {
    const paymentPeriod = paymentPeriodToTypePeriodMap[this.state.paymentPeriod][paymentType];

    return this.state.group.pricing.get(`${paymentType}${paymentPeriod}`);
  }

  render() {
    const groupId = this.props.match.params.id;
    if (!this.state.students || !this.state.group) {
      return null;
    }

    return (<div>
      <div className="form-group">
        <label htmlFor="payment-period">Okres</label>
        <Select
          name="payment-period"
          value={this.state.paymentPeriod}
          options={paymentPeriods}
          onChange={this.paymentPeriodChanged.bind(this)}
        />
      </div>
      <table className="table">
        <tbody>
          {this.state.students.map((student, index) => (<GroupPaymentCheckItem
            groupOptions={student.groupsOptions.get(groupId)}
            key={student._id}
            student={student}
            amount={this.getAmount(student.getIn(['groupsOptions', groupId, 'paymentType'], defaultPaymentType))}
            updateGroupOptions={this.updateGroupOptions.bind(this, index)}
            groupId={groupId}
          />))}
        </tbody>
      </table>
            </div>);
  }
}

export default GroupPaymentCheck;
