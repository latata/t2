import React, { Component } from 'react';
import BankTransferWithMatchingStudents from '../models/BankTransferWithMatchingStudents';
import ConnectTransfers from './ConnectTransfers';
import Loading from './Loading';

class ConnectTransfersContainer extends Component {
  static getDerivedStateFromProps(props) {
    return {
      company: props.match.params.company,
    };
  }

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);

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
    this.setState({ ready: false });
    BankTransferWithMatchingStudents.getAllBankTransfersToAssign(this.state.company)
      .then((bankTransfersWithMatchingStudents) => {
        this.setState({ bankTransfersWithMatchingStudents, ready: true });
      });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <ConnectTransfers
          bankTransfersWithMatchingStudents={this.state.bankTransfersWithMatchingStudents}
          onSave={this.onSave}
        />
      </Loading>
    );
  }
}

export default ConnectTransfersContainer;
