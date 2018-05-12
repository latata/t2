import React  from 'react';
import Icon from './Icon';

function SendMessageBoxRecipients({
  recipients,
  size,
  recipientsLimit,
  removeRecipient,
  recipientsExpanded,
  toggleRecipientsExpanded,
  showAddRecipient,
  setShowAddRecipient,
  clearRecipients,
}) {
  let recipientList = recipients.map(recipient => (
    <div
      className="badge badge-primary ml-1 send-message-box__recipient"
      key={recipient.student._id}
      role="button"
      onClick={() => removeRecipient(recipient)}
    >
      {recipient.student.getFullName()}
      <Icon name="x" />
    </div>));

  if (size > recipientsLimit) {
    recipientList = recipientList.push(
      <div
        className="badge badge-secondary ml-1 send-message-box__show-more"
        key="show-more"
        onClick={() => {
          toggleRecipientsExpanded();
        }}
      >
        {recipientsExpanded ? `ukryj` : `i ${size - recipients.size} więcej...`}
      </div>,
    );
  }

  if (size) {
    recipientList = recipientList.push(
      <div
        className="badge badge-success ml-1 send-message-box__clear"
        key="clear"
        onClick={() => {
          clearRecipients();
        }}
      >
        <Icon name="trash" />
      </div>,
    );
  }

  return (
    <div className="send-message-box__recipients">
      {recipientList}
    </div>
  );
}

export default SendMessageBoxRecipients;
