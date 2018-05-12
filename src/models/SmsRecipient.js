import { Map, List, Record } from 'immutable';
import Student from './Student';
import Base from './Base';
import http from '../services/http';
import OutgoingSms from './OutgoingSms';

export default class SmsRecipient extends Record({
  phoneNo: undefined,
  student: undefined,
}) {
  static create(data) {
    return data && new SmsRecipient({
      phoneNo: data.phoneNo,
      student: Student.create(data.student),
    });
  }

  static send(recipients, text) {
    const recipientsFlat = [];
    recipients.forEach((recipient) => {
      recipientsFlat.push({
        phoneNo: recipient.phoneNo,
        student: recipient.student && recipient.student._id,
      });
    });
    return http('outgoingsms', 'post', {
      text,
      recipients: recipientsFlat,
    }).then(data => List(data.map(message => OutgoingSms.create(message))));
  }
}
