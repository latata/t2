import { Map, List } from 'immutable';
import Student from './Student';
import Base from './Base';
import http from '../http';

export default class Group extends Base({
  code: undefined,
  name: undefined,
  year: undefined,
  company: undefined,
  students: List(),
  groupPayments: List(),
  pricing: Map(),
}) {
  static create(data) {
    const group = {};

    if (typeof data !== 'object') {
      group._id = data;
    } else if (data) {
      group._id = data._id;
      group.code = data.code;
      group.name = data.name;
      group.year = data.year;
      group.company = data.company;
      group.students = data.students && List(data.students.map(student => Student.create(student)))
        .sort((a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1));
      group.groupPayments = data.groupPayments && List(data.groupPayments);
      group.pricing = data.pricing && Map(data.pricing);
    }

    return data && new Group(group);
  }

  getCurrentStudents() {
    return this.students.filter(student => !student.isResigned(this._id));
  }

  getResignedStudents() {
    return this.students.filter(student => student.isResigned(this._id));
  }

  static $getById(id) {
    return http(`group/${id}`)
      .then(group => Group.create(group));
  }

  static $getAll(search = '') {
    return http(`group${search}`)
      .then(groups => List(groups.map(group => Group.create(group))));
  }

  $save(callback) {
    if (!this._id) {
      http('group', 'post', this.flatten())
        .then(callback);
    } else {
      http(`group/${this._id}`, 'put', this.flatten())
        .then(callback);
    }

    return this;
  }
}
