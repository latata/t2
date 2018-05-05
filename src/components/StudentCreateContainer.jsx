import React, { Component } from 'react';
import StudentCreate from './StudentCreate';

class StudentCreateContainer extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(student) {
    student.$save(() => this.props.history.goBack());
  }

  render() {
    return (
      <StudentCreate onSubmit={this.submit} groupId={this.props.match.params.groupId} />
    );
  }
}

export default StudentCreateContainer;
