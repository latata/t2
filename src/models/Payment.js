import Base from './Base';
import Group from './Group';
import Student from './Student';
import BankTransfer from './BankTransfer';
import { List } from 'immutable';
import http from '../http';

export default class Payment extends Base({
  amount: undefined,
  operationDate: undefined,
  paymentGroup: undefined,
  paymentStudent: undefined,
  paymentBankTransfer: undefined,
}) {
  static create(data) {
    if (!data) {
      return;
    }

    const payment = {};

    if (typeof data !== 'object') {
      payment._id = data;
    } else {
      payment._id = data._id;
      payment.amount = data.amount;
      payment.operationDate = data.operationDate;
      payment.paymentGroup = Group.create(data.paymentGroup);
      payment.paymentStudent = Student.create(data.paymentStudent);
      payment.paymentBankTransfer = BankTransfer.create(data.paymentBankTransfer);
    }

    return new Payment(payment);
  }

  static getAllByBankTransferId(id) {
    return http(`payment?paymentBankTransfer=${id}`)
      .then(payments => List(payments.map(payment => Payment.create(payment))));
  }

  static saveAll(payments, bankTransferId) {
    return http(`payment/${bankTransferId}`, 'post', payments.map(payment => payment.flatten()));
  }
}
