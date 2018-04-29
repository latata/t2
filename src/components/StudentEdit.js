import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';
import StudentForm from './StudentForm';
import Student from '../models/Student';


class StudentEdit extends Component {
  constructor(props) {
    super(props);

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
    return (<div className="m-3">
      <h3>{`${get(this, 'state.student.firstName')} ${get(this, 'state.student.lastName')}`}</h3>
      <StudentForm onSubmit={this.submit.bind(this)} student={this.state.student} />
            </div>);
  }
}

export default withRouter(StudentEdit);
