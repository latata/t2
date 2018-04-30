import React, { Component } from 'react';
import ConnectTransferForm from './ConnectTransferForm';
import BankTransferWithMatchingStudents from '../models/BankTransferWithMatchingStudents';

class ConnectTransfers extends Component {
  static getDerivedStateFromProps(props) {
    return {
      company: props.match.params.company,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      bankTransfersWithMatchingStudents: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.company !== this.state.company) {
      this.loadData();
    }
  }

  onSave(index) {
    const bankTransfersWithMatchingStudents = [...this.state.bankTransfersWithMatchingStudents];
    bankTransfersWithMatchingStudents.splice(index, 1);
    this.setState({
      bankTransfersWithMatchingStudents,
    });
  }

  loadData() {
    BankTransferWithMatchingStudents.getAllBankTransfersToAssign(this.state.company)
      .then((bankTransfersWithMatchingStudents) => {
        this.setState({ bankTransfersWithMatchingStudents });
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
