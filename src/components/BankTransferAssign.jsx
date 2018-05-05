import React from 'react';
import ConnectTransferForm from './ConnectTransferForm';

function BankTransferAssign({ item, payments, onSave }) {
  return (
    <ConnectTransferForm
      item={item}
      payments={payments}
      onSave={onSave}
    />);
}

export default BankTransferAssign;
