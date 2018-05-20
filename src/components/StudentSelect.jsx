import React, { Component } from 'react';
import { Async } from 'react-select';
import Student from '../models/Student';
import uniqueid from '../helpers/uniqueid';

class StudentSelect extends Component {

  constructor(props) {
    super(props);

    this.findStudents = this.findStudents.bind(this);

    this.state = {
      showDeleted: false,
    };
  }

  componentWillMount() {
    this.setState({
      uid: uniqueid(),
    });
  }

  findStudents(input, callback) {
    if (input) {
      Student.find(input, this.state.showDeleted)
        .then((students) => {
          const options = students.map((student => ({
            label: `${student.firstName} ${student.lastName}`,
            value: student._id,
            student,
          })))
            .toJS();

          callback(null, {
            options,
            cache: false,
          });
        });
    } else {
      callback(null, {
        options: this.props.emptyInputOptions,
        cache: false,
      });
    }
  }

  render() {
    const showDeletedCheckboxID = `show-deleted-${this.state.uid}`;
    const menuHeader = (
      <div className="student-select__menu-header">
        <input
          type="checkbox"
          id={showDeletedCheckboxID}
          checked={this.state.showDeleted}
          onChange={() => {
            this.setState({
              showDeleted: !this.state.showDeleted,
            }, () => this.select.onInputChange(this.select.state.inputValue));
          }}
        />
        <label htmlFor={showDeletedCheckboxID}>
          szukaj także w archiwum
        </label>
      </div>);

    return (
      <Async
        cache={false}
        className="student-select"
        name="student-select"
        value={this.props.value}
        valueKey={this.props.valueKey}
        labelKey={this.props.labelKey}
        ignoreAccents={false}
        onChange={this.props.onStudentSelected}
        loadOptions={this.findStudents}
        filterOptions={options => options}
        placeholder="Wpisz imię lub nazwisko..."
        ref={(ref) => {
          this.select = ref;
        }}
        menuHeader={menuHeader}
      />
    );
  }

}

StudentSelect.defaultProps = {
  valueKey: 'value',
  labelKey: 'label',
  emptyInputOptions: [],
};

export default StudentSelect;
