import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StudentForm from './StudentForm';
import Student from '../models/Student';


class StudentEdit extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);

    this.state = {
      student: null,
    };
  }

  componentDidMount() {
    Student.$getById(this.props.match.params.id)
      .then((student) => {
        this.setState({ student });
      });
  }

  submit(student) {
    this.setState({ student });
    student.$save(() => this.props.history.goBack());
  }

  render() {
    return (
      this.state.student &&
      <React.Fragment>
        <h2>{this.state.student.getFullName()}</h2>
        <StudentForm onSubmit={this.submit} student={this.state.student} />
      </React.Fragment>);
  }
}

export default withRouter(StudentEdit);
