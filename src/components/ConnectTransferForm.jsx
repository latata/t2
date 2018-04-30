import React, { Component } from 'react';
import Select from 'react-select';
import { List, Map } from 'immutable';
import Icon from './Icon';
import Student from '../models/Student';
import Payment from '../models/Payment';
import formatDate from '../helpers/date';

class ConnectTransferForm extends Component {
  static getDerivedStateFromProps(props) {
    const matchingStudents = props.item.matchingStudentsResult.map(item => ({
      label: `${item.firstName} ${item.lastName}`,
      value: item._id,
    }));
    let paymentItems = props.paymentItems || List();
    if (props.item.matchingStudentsResult.size) {
      paymentItems = paymentItems.push(ConnectTransferForm.paymentItem(
        props.item.matchingStudentsResult.get(0),
        null,
        props.item.bankTransfer.amount,
      ));
    } else if (props.payments) {
      paymentItems = props.payments.map(payment => ConnectTransferForm.paymentItem(
        payment.paymentStudent,
        payment.paymentGroup._id,
        payment.amount,
      ));
    }

    return {
      matchingStudents,
      paymentItems,
    };
  }

  static paymentItem(student, groupId, amount) {
    return Map({
      studentId: student._id,
      groupId: groupId || student.getIn(['groups', 0, '_id']),
      amount,
      label: `${student.firstName} ${student.lastName}`,
      studentGroups: student.get('groups')
        .map((item) => {
          let label = item.code;

          if (
            student.groupsOptions && student.groupsOptions[item._id] &&
            student.groupsOptions[item._id].resigned
          ) {
            label += ' (R)';
          }

          return Map({
            label,
            value: item._id,
          });
        }),
    });
  }

  constructor(props) {
    super(props);

    this.selectStudent = this.selectStudent.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
    this.submit = this.submit.bind(this);
    this.getMatchingStudents = this.getMatchingStudents.bind(this);
    this.addPaymentItem = this.addPaymentItem.bind(this);
    this.ignoreItem = this.ignoreItem.bind(this);

    this.state = {};
  }

  getMatchingStudents(input, callback) {
    if (!input) {
      callback(null, {
        options: this.state.matchingStudents.toJS(),
        // CAREFUL! Only set this to true when there are no more options,
        // or more specific queries will not be sent to the server.
        complete: true,
      });
    } else {
      Student.find(input)
        .then((students) => {
          const options = students.map((student => ({
            label: `${student.firstName} ${student.lastName}`,
            value: student._id,
            student,
          })))
            .toJS();

          callback(null, {
            options,
            complete: true,
          });
        });
    }
  }

  removePaymentItem(index) {
    const newAmount = this.props.item.bankTransfer.amount / (this.state.paymentItems.size - 1);
    const paymentItems = this.state.paymentItems.remove(index)
      .map(paymentItem => paymentItem.set('amount', newAmount));

    this.setState({
      paymentItems,
    });
  }

  ignoreItem() {
    if (window.confirm('Czy na pewno chcesz usunac wpłatę? Nie będzie można do niej przypisywac płatnosci.')) {
      this.props.item.bankTransfer.delete(() => this.props.onSave());
    }
  }

  submit(event) {
    event.preventDefault();

    Payment.saveAll(this.state.paymentItems.map(paymentItem => Payment.create({
      amount: parseFloat(paymentItem.get('amount')),
      operationDate: this.props.item.bankTransfer.operationDate,
      paymentStudent: paymentItem.get('studentId'),
      paymentGroup: paymentItem.get('groupId'),
    })), this.props.item.bankTransfer._id)
      .then(() => this.props.onSave())
      .catch(err => this.setState({
        error: err.message,
      }));
  }

  amountChange(index, event) {
    const value = event.target.value.replace(',', '.');
    let paymentItems = this.state.paymentItems.setIn([index, 'amount'], value);

    if (paymentItems.size === 2) {
      const index2 = (index + 1) % 2;

      paymentItems = paymentItems.setIn([index2, 'amount'], this.props.item.bankTransfer.amount - value);
    }

    this.setState({
      paymentItems,
    });
  }

  addPaymentItem() {
    let { paymentItems } = this.state;
    const amount = this.props.item.bankTransfer.amount / (paymentItems.size + 1);

    paymentItems = paymentItems.map(paymentItem => paymentItem.set('amount', amount));
    paymentItems = paymentItems.push(paymentItems.last());

    this.setState({
      paymentItems,
    });
  }

  selectGroup(index, data) {
    const paymentItems = this.state.paymentItems.setIn([index, 'groupId'], data && data.value);

    this.setState({
      paymentItems,
    });
  }

  selectStudent(index, data) {
    let student;
    let { paymentItems } = this.state;

    if (data) {
      if (data.student) {
        student = Student.create(data.student);
      } else {
        student = data && this.props.item.matchingStudentsResult
          .filter(s => s._id === data.value)
          .get(0);
      }

      paymentItems = paymentItems.update(index, item => ConnectTransferForm.paymentItem(student, null, item.get('amount')));
    } else {
      paymentItems = paymentItems.update(index, item => item.merge(Map({
        studentId: null,
        studentGroups: List(),
        groupId: null,
        label: null,
      })));
    }

    this.setState({
      paymentItems,
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="mb-2">
              <span className="font-weight-bold">Dane: </span>
              {this.props.item.bankTransfer.senderData}
            </div>
            <div className="mb-2">
              <span className="font-weight-bold">Tytuł: </span>
              {this.props.item.bankTransfer.title}
            </div>
            <div className="mb-2">
              <span className="font-weight-bold">Kwota: </span>
              {this.props.item.bankTransfer.amount} PLN
            </div>
            <div className="mb-2">
              <span className="font-weight-bold">Data: </span>
              {formatDate(this.props.item.bankTransfer.operationDate)}
            </div>
          </div>
          <div className="col-md-8">
            {this.state.paymentItems.toJS()
              .map((paymentItem, index) => (
                <div key={index} className="d-flex align-items-start">
                  <div style={{ flex: 2 }}>
                    <Select.Async
                      name="form-field-name"
                      value={paymentItem}
                      valueKey="studentId"
                      labelKey="label"
                      onChange={data => this.selectStudent(index, data)}
                      loadOptions={this.getMatchingStudents}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Select
                      name="form-field-name2"
                      value={paymentItem.groupId}
                      onChange={data => this.selectGroup(index, data)}
                      options={paymentItem.studentGroups}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      className="form-control"
                      value={paymentItem.amount}
                      onChange={event => this.amountChange(index, event)}
                    />
                  </div>
                  {index > 0 &&
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => this.removePaymentItem(index)}
                    >
                      <Icon name="x" />
                    </button>
                  </div>}
                </div>))}
            {this.state.error && (
              <div className="alert alert-danger" role="alert">
                {this.state.error}
              </div>)}
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={this.addPaymentItem}
            >
              <Icon name="plus" />
            </button>
            <button className="btn btn-primary" type="submit">Zapisz</button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.ignoreItem}
            >
              Usuń
            </button>
          </div>
        </div>
      </form>);
  }
}

export default ConnectTransferForm;
