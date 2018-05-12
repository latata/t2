import React, { Component } from 'react';
import h from 'react-hyperscript';
import Select from 'react-select';
import './SendMessageBox.css';
import NavBar from './NavBar';
import SendMessageBoxRecipients from './SendMessageBoxRecipients';

const recipientsLimit = 4;

class SendMessageBoxForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipientsExpanded: false,
    };
  }

  render() {
    const {
      recipients,
      studentSelected,
      recipient,
      removeRecipient,
      text,
      textUpdated,
      sendSMS,
      clearRecipients,
    } = this.props;
    let recipientList = recipients;

    if (!this.state.recipientsExpanded) {
      recipientList = recipientList.slice(0, recipientsLimit);
    }

    const recipientsBadges = recipients.size ? (
      <SendMessageBoxRecipients
        recipients={recipientList}
        size={recipients.size}
        recipientsLimit={recipientsLimit}
        removeRecipient={removeRecipient}
        recipientsExpanded={this.state.recipientsExpanded}
        toggleRecipientsExpanded={() => {
          this.setState({ recipientsExpanded: !this.state.recipientsExpanded });
        }}
        clearRecipients={clearRecipients}
      />
    ) : null;
    const recipientSelect = (
      <Select.Async
        name="recipient"
        placeholder="Wpisz imię lub naziwsko..."
        value={recipient}
        valueKey="value"
        labelKey="label"
        onChange={studentSelected}
        loadOptions={NavBar.findStudents}
      />
    );

    return (
      h('form.card-body', { onSubmit: sendSMS }, [
        recipientsBadges,
        recipientSelect,
        h('textarea.form-control.send-message-box__text"', {
          value: text,
          onChange: textUpdated,
        }),
        h('.send-message-box__details', [`SMS zawiera aktualnie ${text.length} znaków.`, h('br'), 'Max. 160 na 1 SMS.']),
        h('button.btn.btn-outline-primary', 'Wyślij'),
      ])
    );
  }
}

export default SendMessageBoxForm;
