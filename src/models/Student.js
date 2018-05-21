import { Map, List, fromJS } from 'immutable';
import Base from './Base';
import http from '../services/http';
import Group from './Group';

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
    } else if (data) {
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
      student.groups = data.groups && List(data.groups.map(group => Group.create(group)));
      student.studentPayments = data.studentPayments && List(data.studentPayments);
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

  isAssignedToGroup(groupId) {
    return this.groups.find(group => group._id === groupId);
  }

  static comparator(studentA, studentB) {
    const lastNameA = studentA.lastName && studentA.lastName.toLowerCase();
    const lastNameB = studentB.lastName && studentB.lastName.toLowerCase();
    const firstNameA = studentA.firstName && studentA.firstName.toLowerCase();
    const firstNameB = studentB.firstName && studentB.firstName.toLowerCase();

    if (lastNameA < lastNameB) {
      return -1;
    } else if (lastNameA > lastNameB) {
      return 1;
    }
    if (firstNameA < firstNameB) {
      return -1;
    }
    return 1;
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

  $delete(callback) {
    http(`student/${this._id}`, 'delete')
      .then(callback);

    return this;
  }

  static find(query, showDeleted = false) {
    let path = `student?query=${query}`;
    if (showDeleted) path += '&showDeleted=1';

    return http(path)
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
