import { List } from 'immutable';
import SmsRecipient from '../models/SmsRecipient';

export default {
  callbacks: [],
  recipients: List(),
  text: '',

  subscribe(cb) {
    if (!this.callbacks.length) {
      this.load();
    }
    this.callbacks.push(cb);
    this.update();
  },

  update() {
    this.store();
    this.callbacks.forEach(cb => cb());
  },

  addRecipient(recipient) {
    if (this.recipients.find(item => item.phoneNo === recipient.phoneNo)) {
      window.alert('Numer telefonu istnieje już na liście odbiorców');
      return;
    }
    this.recipients = this.recipients.push(recipient);
    this.update();
  },

  removeRecipient(recipient) {
    this.recipients = this.recipients.filter(r => recipient !== r);
    this.update();
  },

  clearRecipients() {
    this.recipients = List();
    this.text = '';
    this.update();
  },

  setText(text) {
    this.text = text;
    this.update();
  },

  store() {
    const serialized = JSON.stringify(this.recipients.toJS());

    window.localStorage.setItem('smsRecipients', serialized);
    window.localStorage.setItem('smsText', this.text);
  },

  load() {
    const serializedRecipients = window.localStorage.getItem('smsRecipients');
    this.text = window.localStorage.getItem('smsText') || '';

    if (serializedRecipients) {
      this.recipients = List(JSON.parse(serializedRecipients)
        .map(recipient =>
          SmsRecipient.create(recipient)));
    }
  },
};
