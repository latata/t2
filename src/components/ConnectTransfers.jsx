import React from 'react';
import ConnectTransferForm from './ConnectTransferForm';

function ConnectTransfers({ bankTransfersWithMatchingStudents, onSave }) {
  return (
    <div>
      {bankTransfersWithMatchingStudents.map((item, index) => (<ConnectTransferForm
        key={item.bankTransfer._id}
        item={item}
        onSave={() => onSave(index)}
      />))}
    </div>);
}

export default ConnectTransfers;
