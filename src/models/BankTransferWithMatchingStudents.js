import { List, Record } from 'immutable';
import http from '../http';
import Student from './Student';
import BankTransfer from './BankTransfer';

export default class BankTransferWithMatchingStudents extends Record({
  bankTransfer: undefined,
  matchingStudentsResult: undefined,
}) {
  static create(data) {
    if (!data) {
      return;
    }

    const bankTransferWithMatchingStudents = {};

    bankTransferWithMatchingStudents.bankTransfer = BankTransfer.create(data.bankTransfer);
    bankTransferWithMatchingStudents.matchingStudentsResult = List(data.matchingStudentsResult
      .map(student => Student.create(student)));

    return new BankTransferWithMatchingStudents(bankTransferWithMatchingStudents);
  }

  static getAllBankTransfersToAssign() {
    return http('connectbanktransfers')
      .then(bankTransfersWithMatchingStudents => List(bankTransfersWithMatchingStudents.map(bankTransferWithMatchingStudents =>
        BankTransferWithMatchingStudents.create(bankTransferWithMatchingStudents))));
  }
}
