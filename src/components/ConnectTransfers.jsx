import React, { Component } from 'react';
import ConnectTransferForm from './ConnectTransferForm';
import BankTransferWithMatchingStudents from '../models/BankTransferWithMatchingStudents';

class ConnectTransfers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankTransfersWithMatchingStudents: [],
    };
  }

  componentDidMount() {
    BankTransferWithMatchingStudents.getAllBankTransfersToAssign()
      .then((bankTransfersWithMatchingStudents) => {
        this.setState({ bankTransfersWithMatchingStudents });
      });
  }

  onSave(index) {
    const bankTransfersWithMatchingStudents = [...this.state.bankTransfersWithMatchingStudents];
    bankTransfersWithMatchingStudents.splice(index, 1);
    this.setState({
      bankTransfersWithMatchingStudents,
    });
  }

  render() {
    return (
      <div>
        {this.state.bankTransfersWithMatchingStudents.map((item, index) => (<ConnectTransferForm
          key={item.bankTransfer._id}
          item={item}
          onSave={() => this.onSave(index)}
        />))}
      </div>);
  }
}

export default ConnectTransfers;
