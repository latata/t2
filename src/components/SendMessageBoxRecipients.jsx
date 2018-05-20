import h from 'react-hyperscript';
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
  let recipientList = recipients.toJS().map((item, index) => {
    const recipient = recipients.get(index);

    return h('.badge.badge-primary.ml-1.send-message-box__recipient', {
      key: recipient.student._id,
      role: 'button',
      onClick: () => removeRecipient(recipient),
    }, [
      recipient.student.getFullName(),
      h(Icon, { name: 'x' }),
    ]);
  });

  if (size > recipientsLimit) {
    recipientList.push(
      h('.badge.badge-secondary.ml-1.send-message-box__show-more', {
        key: 'show-more',
        role: 'button',
        onClick: () => toggleRecipientsExpanded(),
      }, recipientsExpanded ? `ukryj` : `i ${size - recipients.size} więcej...`),
    );
  }

  if (size) {
    recipientList.push(
      h('.badge.badge-success.ml-1.send-message-box__clear', {
        key: 'clear',
        onClick: () => clearRecipients(),
      }, [
        h(Icon, { name: 'trash' }),
      ]),
    );
  }

  return h('.send-message-box__recipients', recipientList);
}

export default SendMessageBoxRecipients;
