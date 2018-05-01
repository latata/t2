import React, { Component } from 'react';
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
      <React.Fragment>
        <h2>Nowy uczeń</h2>
        <StudentForm
          group={this.props.match.params.groupId}
          onSubmit={this.submit}
        />
      </React.Fragment>);
  }
}

export default StudentCreate;
