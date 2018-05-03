import React, { Component } from 'react';
import Select from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import Student from '../models/Student';

class NavBar extends Component {
  static findStudents(input, callback) {
    if (input) {
      Student.find(input)
        .then((students) => {
          const options = students.map((student => ({
            label: `${student.firstName} ${student.lastName}`,
            value: student._id,
            student,
          })))
            .toJS();

          callback(null, {
            options,
            complete: true,
          });
        });
    } else {
      callback(null, {
        options: [],
        complete: true,
      });
    }
  }

  constructor(props) {
    super(props);

    this.studentSelected = this.studentSelected.bind(this);
    // this.findStudents = this.findStudents.bind(this);

    this.state = {
      search: undefined,
    };
  }

  studentSelected(data) {
    this.props.history.push(`/student/${data.student._id}`);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Studio Tańca Tango - T2 FTW!</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/groups" className="nav-link">Grupy</Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="dropdown03"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >Przyporządkuj
                  płatności
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdown03">
                  <Link to="/connect-transfers/AT" className="dropdown-item">Anna Tatała</Link>
                  <Link to="/connect-transfers/LT" className="dropdown-item">Leszek Tatała</Link>
                </div>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-md-0"
              style={{
                flex: 1,
                maxWidth: '250px',
              }}
            >
              <Select.Async
                wrapperStyle={{ flex: 1 }}
                name="search"
                value={this.state.search}
                valueKey="value"
                labelKey="label"
                onChange={this.studentSelected}
                loadOptions={NavBar.findStudents}
              />
            </form>
          </div>
        </div>
      </nav>);
  }
}

export default withRouter(NavBar);
