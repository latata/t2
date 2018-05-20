import React, { Component } from 'react';
import Select from 'react-select';
import { List, Map } from 'immutable';
import get from 'lodash.get';
import Student from '../models/Student';
import Group from '../models/Group';

class StudentForm extends Component {
  static getDate(isoDate) {
    return isoDate.substr(0, 10);
  }

  static getIds(groups) {
    return groups.map((group) => {
      if (typeof group === 'object') {
        return group._id;
      }
      return group;
    });
  }

  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.selectChanged = this.selectChanged.bind(this);

    this.state = {
      student: this.props.student || Student.create(props.group ? { groups: [props.group] } : {}),
    };
  }

  componentDidMount() {
    Group.$getAll({
      showDeleted: '1',
    })
      .then((groups) => {
        this.setState({
          groups: groups.map(group => Map({
            value: group._id,
            label: group.code,
          })),
        });
      });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ student: newProps.student });
  }

  inputChanged(event) {
    this.setState({ student: this.state.student.set(event.target.name, event.target.value) });
  }

  selectChanged(data) {
    this.setState({ student: this.state.student.set('groups', List(data.map(group => group.value))) });
  }

  submit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.student);
  }

  render() {
    if (!this.state.groups) {
      return null;
    }

    return (
      <form onSubmit={this.submit}>
        <div className="form-group">
          <label htmlFor="firstName">Imię</label>
          <input
            name="firstName"
            id="firstName"
            className="form-control"
            value={get(this, 'state.student.firstName', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Naziwsko</label>
          <input
            name="lastName"
            id="lastName"
            className="form-control"
            value={get(this, 'state.student.lastName', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Data urodzenia</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            className="form-control"
            value={StudentForm.getDate(get(this, 'state.student.birthDate', ''))}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Telefon</label>
          <input
            name="phoneNo"
            id="phoneNo"
            className="form-control"
            value={get(this, 'state.student.phoneNo', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo2">Telefon 2</label>
          <input
            name="phoneNo2"
            id="phoneNo2"
            className="form-control"
            value={get(this, 'state.student.phoneNo2', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Ulica</label>
          <input
            name="street"
            id="street"
            className="form-control"
            value={get(this, 'state.student.street', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Kod pocztowy</label>
          <input
            name="postalCode"
            id="postalCode"
            className="form-control"
            value={get(this, 'state.student.postalCode', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Miejscowość</label>
          <input
            name="city"
            id="city"
            className="form-control"
            value={get(this, 'state.student.city', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={get(this, 'state.student.email', '')}
            onChange={this.inputChanged}
          />
        </div>
        <div className="form-group">
          <label htmlFor="className">Klasa</label>
          <input
            name="className"
            id="className"
            className="form-control"
            value={get(this, 'state.student.className', '')}
            onChange={this.inputChanged}
          />
        </div>

        <div className="form-group">
          <label htmlFor="groups">Grupy</label>
          <Select
            name="groups"
            multi
            value={StudentForm.getIds(get(this, 'state.student.groups', List())
              .toJS())}
            onChange={this.selectChanged}
            options={this.state.groups.toJS()}
          />
        </div>

        <button type="submit" className="mb-4 btn btn-primary">
          Zapisz
        </button>
      </form>);
  }
}

export default StudentForm;
