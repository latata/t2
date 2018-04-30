import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import StudentForm from './StudentForm';

class StudentCreate extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(student) {
    student.$save(() => this.props.history.goBack());
  }

  render() {
    return (
      <div className="m-3"><h3>Nowy uczeń</h3><StudentForm
        group={this.props.match.params.groupId}
        onSubmit={this.submit}
      />
      </div>);
  }
}

export default StudentCreate;
