import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import StudentForm from './StudentForm';

class StudentCreate extends Component {
  submit(student) {
    student.$save(() => this.props.history.goBack());
  }

  render() {
    return (<div className="m-3"><h3>Nowy uczeń</h3><StudentForm
      group={this.props.match.params.groupId}
      onSubmit={this.submit.bind(this)}
    />
            </div>);
  }
}

export default StudentCreate;
