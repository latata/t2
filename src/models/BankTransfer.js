import Base from './Base';
import http from '../services/http';

class BankTransfer extends Base({
  amount: undefined,
  hash: undefined,
  operationDate: undefined,
  postDate: undefined,
  senderAccountNumber: undefined,
  senderData: undefined,
  title: undefined,
  transactionType: undefined,
}) {
  static create(data) {
    const bankTransfer = {};

    if (typeof data !== 'object') {
      bankTransfer._id = data;
    } else if (data) {
      bankTransfer._id = data._id;
      bankTransfer.amount = data.amount;
      bankTransfer.hash = data.hash;
      bankTransfer.operationDate = data.operationDate;
      bankTransfer.postDate = data.postDate;
      bankTransfer.senderAccountNumber = data.senderAccountNumber;
      bankTransfer.senderData = data.senderData;
      bankTransfer.title = data.title;
      bankTransfer.transactionType = data.transactionType;
    }

    return data && new BankTransfer(bankTransfer);
  }

  static getById(id) {
    return http(`banktransfer/${id}`)
      .then(bankTransfer => BankTransfer.create(bankTransfer));
  }

  delete(callback) {
    http(`banktransfer/${this._id}`, 'delete')
      .then(callback);

    return this;
  }
}

export default BankTransfer;
