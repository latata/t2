import { Map } from 'immutable';
import Student from './Student';
import Base from './Base';

export default class OutgoingSms extends Base({
  text: undefined,
  phoneNo: undefined,
  outgoingSmsStudent: undefined,
  smsId: undefined,
  smsData: undefined,
}) {
  static create(data) {
    return data && new OutgoingSms({
      text: data.text,
      phoneNo: data.phoneNo,
      outgoingSmsStudent: Student.create(data.outgoingSmsStudent),
      smsId: data.smsId,
      smsData: Map(data.smsData),
    });
  }
}
