import h from 'react-hyperscript';
import { Component } from 'react';
import { List } from 'immutable';
import SendMessageBox from './SendMessageBox';
import sms from '../services/sms';
import SmsRecipient from '../models/SmsRecipient';

class SendMessageBoxContainer extends Component {
  constructor(props) {
    super(props);

    this.studentSelected = this.studentSelected.bind(this);
    this.removeRecipient = this.removeRecipient.bind(this);
    this.textUpdated = this.textUpdated.bind(this);
    this.sendSMS = this.sendSMS.bind(this);
    this.newMessage = this.newMessage.bind(this);

    this.state = {
      recipients: List(),
      text: '',
      status: undefined,
    };
  }

  componentDidMount() {
    sms.subscribe(() => {
      if (sms.recipients.size) {
        this.setState({
          status: undefined,
        });
      }

      this.setState({
        recipients: sms.recipients,
        text: sms.text,
      });
    });
  }

  studentSelected(data) {
    sms.addRecipient(SmsRecipient.create({
      phoneNo: data.student.phoneNo,
      student: data.student,
    }));
  }

  removeRecipient(recipient) {
    sms.removeRecipient(recipient);
  }

  textUpdated(event) {
    sms.setText(event.target.value);
  }

  sendSMS(event) {
    event.preventDefault();

    SmsRecipient.send(this.state.recipients, this.state.text).then((data) => {
      sms.clearRecipients();
      this.setState({
        status: data,
      });
    });
  }

  clearRecipients() {
    if (window.confirm('Czy na pewno chcesz wyczyścić listę odbiorców sms?')) {
      sms.clearRecipients();
    }
  }

  newMessage() {
    this.setState({
      status: undefined,
    });
  }

  render() {
    const {
      recipients,
      text,
      recipient,
      status,
    } = this.state;

    return (
      h(SendMessageBox, {
        recipients,
        recipient,
        text,
        textUpdated: this.textUpdated,
        studentSelected: this.studentSelected,
        removeRecipient: this.removeRecipient,
        sendSMS: this.sendSMS,
        clearRecipients: this.clearRecipients,
        newMessage: this.newMessage,
        status,
      })
    );
  }
}

export default SendMessageBoxContainer;
