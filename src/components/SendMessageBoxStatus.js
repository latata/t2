import h from 'react-hyperscript';

function SendMessageBoxStatus({status, newMessage}) {
  const sent = status.filter(message => message.smsData.get('status') !== 'unsent');
  const unsent = status.filter(message => message.smsData.get('status') === 'unsent');

  return (
    h('.send-message-box__status', [
      h('.alert.alert-success', `Wysłano ${sent.size} wiadomości`),
      h('.alert.alert-danger', [
        `Nie wysłano ${unsent.size} wiadomości`,
        h('ul.list-group', unsent.map(message => h('li.list-group-item', `${message.outgoingSmsStudent.getFullName()} ${message.phoneNo}`)).toJS()),
      ]),
      h('button.btn.btn-sm.btn-outline-primary', {
        onClick: newMessage,
      }, 'Nowa wiadomość'),
    ])
  );
}

export default SendMessageBoxStatus;
