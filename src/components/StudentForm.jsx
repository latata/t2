import React, { Component } from 'react';
import Select from 'react-select';
import { List, Map } from 'immutable';
import get from 'lodash.get';
import Student from '../models/Student';
import Group from '../models/Group';
import InputGroup from './forms/InputGroup';
import SimpleValidator from '../helpers/validators/SimpleValidator';
import EmailValidator from '../helpers/validators/EmailValidator';

const validators = {
  firstName: new SimpleValidator({ required: true }),
  lastName: new SimpleValidator({ required: true }),
  email: new EmailValidator(),
};

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
    this.onValidityChange = this.onValidityChange.bind(this);

    this.errors = Map();

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
          groups: groups
            .filter(group => !group.deleted || this.state.student.isAssignedToGroup(group._id))
            .map(group => Map({
              value: group._id,
              label: group.getLabel(this.state.student),
            })),
        });
      });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ student: newProps.student });
  }

  inputChanged({ name, value }) {
    this.setState({ student: this.state.student.set(name, value) });
  }

  selectChanged(data) {
    this.setState({ student: this.state.student.set('groups', List(data.map(group => group.value))) });
  }

  onValidityChange({ name, error }) {
    // we need to use component property because state udpates are asynchronous
    if (error) {
      this.errors = this.errors.set(name, error);
    } else {
      this.errors = this.errors.delete(name);
    }
  }

  submit(event) {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
    if (!this.errors.size) {
      this.props.onSubmit(this.state.student);
    }
  }

  render() {
    if (!this.state.groups) {
      return null;
    }

    return (
      <form onSubmit={this.submit} noValidate={true}>
        <InputGroup
          label="Imię"
          name="firstName"
          validator={validators.firstName}
          value={get(this, 'state.student.firstName', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Nazwisko"
          name="lastName"
          validator={validators.lastName}
          value={get(this, 'state.student.lastName', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Data urodzenia"
          name="birthDate"
          type="date"
          value={StudentForm.getDate(get(this, 'state.student.birthDate', ''))}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Telefon"
          name="phoneNo"
          value={get(this, 'state.student.phoneNo', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Telefon 2"
          name="phoneNo2"
          value={get(this, 'state.student.phoneNo2', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Ulica"
          name="street"
          value={get(this, 'state.student.street', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Kod pocztowy"
          name="postalCode"
          value={get(this, 'state.student.postalCode', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Miejscowość"
          name="city"
          value={get(this, 'state.student.city', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="E-mail"
          name="email"
          type="email"
          validator={validators.email}
          value={get(this, 'state.student.email', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
        <InputGroup
          label="Klasa"
          name="className"
          value={get(this, 'state.student.className', '')}
          submitted={this.state.submitted}
          onChange={this.inputChanged}
          onValidityChange={this.onValidityChange}
        />
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
