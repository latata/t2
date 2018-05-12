import React, { Component } from 'react';
import { List } from 'immutable';
import BankTransfer from '../models/BankTransfer';
import BankTransferWithMatchingStudents from '../models/BankTransferWithMatchingStudents';
import Payment from '../models/Payment';
import BankTransferAssign from './BankTransferAssign';
import Loading from './Loading';

class BankTransferAssignContainer extends Component {
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
    Promise.all([
      BankTransfer.getById(this.props.match.params.id),
      Payment.$getAllByBankTransferId(this.props.match.params.id),
    ])
      .then(([bankTransfer, payments]) => {
        const item = BankTransferWithMatchingStudents.create({
          bankTransfer,
          matchingStudentsResult: [],
        });

        this.setState({
          item,
          payments,
          ready: true,
        });
      });
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <BankTransferAssign
          item={this.state.item}
          payments={this.state.payments}
          onSave={() => {
            this.props.history.goBack();
          }}
        />
      </Loading>
    );
  }
}

export default BankTransferAssignContainer;
