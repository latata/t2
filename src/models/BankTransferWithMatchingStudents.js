import { List, Record } from 'immutable';
import http from '../http';
import Student from './Student';
import BankTransfer from './BankTransfer';

export default class BankTransferWithMatchingStudents extends Record({
  bankTransfer: undefined,
  matchingStudentsResult: undefined,
}) {
  static create(data) {
    const bankTransferWithMatchingStudents = {};

    bankTransferWithMatchingStudents.bankTransfer = BankTransfer.create(data.bankTransfer);
    bankTransferWithMatchingStudents.matchingStudentsResult = List(data.matchingStudentsResult
      .map(student => Student.create(student)));

    return data && new BankTransferWithMatchingStudents(bankTransferWithMatchingStudents);
  }

  static getAllBankTransfersToAssign(company = 'AT') {
    return http(`connectbanktransfers/${company}`)
      .then(bankTransfersWithMatchingStudents =>
        List(bankTransfersWithMatchingStudents.map(bankTransferWithMatchingStudents =>
          BankTransferWithMatchingStudents.create(bankTransferWithMatchingStudents))));
  }
}
