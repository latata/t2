import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Student from '../models/Student';
import Loading from './Loading';
import StudentEdit from './StudentEdit';


class StudentEditContainer extends Component {
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
        this.setState({ student, ready: true });
      });
  }

  submit(student) {
    this.setState({ student });
    student.$save(() => this.props.history.goBack());
  }

  render() {
    return (
      <Loading ready={this.state.ready}>
        <StudentEdit student={this.state.student} onSubmit={this.submit} />
      </Loading>
    );
  }
}

export default withRouter(StudentEditContainer);
