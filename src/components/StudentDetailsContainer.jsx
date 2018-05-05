import React, { Component } from 'react';
import Student from '../models/Student';
import StudentDetails from './StudentDetails';
import Loading from './Loading';

class StudentDetailsContainer extends Component {
  static getDerivedStateFromProps(props) {
    return {
      id: props.match.params.id,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      student: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.loadData();
    }
  }

  loadData() {
    Student.$getById(this.state.id)
      .then(student => this.setState({
        student,
        ready: true,
      }));
  }

  render() {
    const currentRoute = this.props.location.pathname.endsWith('payments') ? 'payments' : 'data';

    return (
      <Loading ready={this.state.ready}>
        <StudentDetails student={this.state.student} currentRoute={currentRoute} />
      </Loading>
    );
  }
}

export default StudentDetailsContainer;
