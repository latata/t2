import h from 'react-hyperscript';
import { Component } from 'react';
import './SendMessageBox.css';
import SendMessageBoxForm from './SendMessageBoxForm';
import SendMessageBoxStatus from './SendMessageBoxStatus';
import Icon from './Icon';

class SendMessageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {
    const {
      recipients,
      recipient,
      text,
      textUpdated,
      studentSelected,
      removeRecipient,
      sendSMS,
      status,
      clearRecipients,
      newMessage,
    } = this.props;
    let content;

    if (!this.state.expanded) {
      return (
        h('button.send-message-box__circle', {
          onClick: () => {
            this.setState({ expanded: true });
          },
        }, [
          h(Icon, {
            name: 'phone',
          }),
          recipients.size,
        ])
      );
    }

    if (status) {
      content = h(SendMessageBoxStatus, {
        status,
        newMessage,
      });
    } else {
      content = h(SendMessageBoxForm, {
        recipients,
        recipient,
        text,
        textUpdated,
        studentSelected,
        removeRecipient,
        sendSMS,
        clearRecipients,
      });
    }

    return (
      h('.send-message-box.card', [
        h('.card-header', [
          'SMS',
          h('button.btn.btn-sm.btn-outline-dark', {
            onClick: () => {
              this.setState({ expanded: false });
            },
          }, [
            h(Icon, {
              name: 'collapse-down',
            }),
          ]),
        ]),
        content,
      ]));
  }
}

export default SendMessageBox;
