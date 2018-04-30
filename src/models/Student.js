import { Map, List, fromJS } from 'immutable';
import Base from './Base';
import http from '../http';

export default class Student extends Base({
  firstName: undefined,
  lastName: undefined,
  phoneNo: undefined,
  phoneNo2: undefined,
  street: undefined,
  postalCode: undefined,
  city: undefined,
  email: undefined,
  className: undefined,
  birthDate: undefined,
  deleted: undefined,
  resigned: undefined,
  groupsOptions: Map(),
  groups: List(),
  studentPayments: List(),
}) {
  static create(data) {
    const student = {};

    if (typeof data !== 'object') {
      student._id = data;
    } else {
      student._id = data._id;
      student.firstName = data.firstName;
      student.lastName = data.lastName;
      student.phoneNo = data.phoneNo;
      student.phoneNo2 = data.phoneNo2;
      student.street = data.street;
      student.postalCode = data.postalCode;
      student.city = data.city;
      student.email = data.email;
      student.className = data.className;
      student.birthDate = data.birthDate;
      student.deleted = data.deleted;
      student.resigned = data.resigned;
      student.groupsOptions = fromJS(data.groupsOptions);
      student.groups = List(data.groups);
      student.studentPayments = List(data.studentPayments);
    }

    return data && new Student(student);
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  setResigned(groupId, resigned = true) {
    return this.setIn(['groupsOptions', groupId, 'resigned'], resigned);
  }

  isResigned(groupId) {
    return this.getIn(['groupsOptions', groupId, 'resigned'], false);
  }

  $save(callback, propertyName) {
    if (this._id) {
      let data = this.flatten();

      if (propertyName) {
        data = { [propertyName]: data[propertyName] };
      }

      http(`student/${this._id}`, 'put', data)
        .then(callback);
    } else {
      http('student', 'post', this.flatten())
        .then(callback);
    }

    return this;
  }

  delete(callback) {
    http(`student/${this._id}`, 'delete')
      .then(callback);

    return this;
  }

  static find(query) {
    return http(`student?query=${query}`)
      .then(students => List(students.map(student => Student.create(student))));
  }

  static $getAllByGroup(groupId) {
    return http(`student?groups=${groupId}`)
      .then(students => List(students.map(student => Student.create(student))));
  }

  static $getById(id) {
    return http(`student/${id}`)
      .then(student => Student.create(student));
  }
}
