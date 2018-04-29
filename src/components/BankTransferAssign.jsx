import React, { Component } from 'react';
import { List } from 'immutable';
import ConnectTransferForm from './ConnectTransferForm';
import BankTransfer from '../models/BankTransfer';
import BankTransferWithMatchingStudents from '../models/BankTransferWithMatchingStudents';
import Payment from '../models/Payment';

class BankTransferAssign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: BankTransferWithMatchingStudents.create({
        bankTransfer: null,
        matchingStudentsResult: [],
      }),
      payments: List(),
    };
  }

  componentDidMount() {
    BankTransfer.getById(this.props.match.params.id)
      .then((bankTransfer) => {
        const item = BankTransferWithMatchingStudents.create({
          bankTransfer,
          matchingStudentsResult: [],
        });

        this.setState({ item });
      });

    Payment.getAllByBankTransferId(this.props.match.params.id)
      .then((payments) => {
        this.setState({ payments });
      });
  }

  render() {
    if (this.state.item.bankTransfer && this.state.payments.size) {
      return (<ConnectTransferForm
        item={this.state.item}
        payments={this.state.payments}
        onSave={() => {
          this.props.history.goBack();
        }}
      />);
    }
    return null;
  }
}

export default BankTransferAssign;
