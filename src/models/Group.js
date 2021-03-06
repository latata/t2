import { Map, List } from 'immutable';
import Student from './Student';
import Base from './Base';
import http from '../services/http';

export default class Group extends Base({
  code: undefined,
  name: undefined,
  deleted: undefined,
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
      group.deleted = data.deleted;
      group.year = data.year;
      group.company = data.company;
      group.students = data.students && List(data.students.map(student => Student.create(student)))
        .sort((a, b) => Student.comparator(a, b));
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

  getCurrentSize() {
    return this.students.reduce((prev, student) => {
      if (!student.getIn(['groupsOptions', this._id, 'resigned'])) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  getLabel(student) {
    let label = this.code;

    if (this.deleted) {
      label += ' (archiwum)';
    } else if (student && student.isResigned(this._id)) {
      label += ' (rezygnacja)';
    }

    return label;
  }

  getWeight(student) {
    if (this.deleted) {
      return 2;
    }

    if (student.isResigned(this._id)) {
      return 1;
    }

    return 0;
  }

  static comparator(groupA, groupB, student) {
    const weightDiff = groupA.getWeight(student) - groupB.getWeight(student);

    if (weightDiff) {
      return weightDiff;
    }

    if (groupA.code < groupB.code) {
      return -1;
    } else if (groupA.code > groupB.code) {
      return 1;
    }

    return 0;
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

  $delete(callback) {
    http(`group/${this._id}`, 'delete')
      .then(callback);

    return this;
  }

  $undelete(callback) {
    http(`group/${this._id}`, 'put', {
      deleted: false,
    })
      .then(callback);

    return this;
  }

  static $getById(id) {
    return http(`group/${id}`)
      .then(group => Group.create(group));
  }

  static $getAll(params) {
    let search = '';
    if (params) {
      search += '?';
      Object.keys(params)
        .forEach((key) => {
          search += `${key}=${params[key]}`;
        });
    }

    return http(`group${search}`)
      .then(groups => List(groups.map(group => Group.create(group))));
  }
}
