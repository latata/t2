import React  from 'react';
import { Link, Route } from 'react-router-dom';
import get from 'lodash.get';
import Icon from './Icon';
import formatDate from '../helpers/date';

function StudentData({ student }) {
  return (
    <div className="row">
      <div className="col-md">
        <div>
          <div className="d-flex align-items-center mb-2">
            <Icon name="phone" className="mr-2" /> {get(student, 'phoneNo')}
          </div>
          {get(student, 'phoneNo2') &&
          <div className="d-flex align-items-center mb-2">
            <Icon name="phone" className="mr-2" /> {get(student, 'phoneNo2')}
          </div>}
          <div className="d-flex align-items-center mb-2">
            <Icon name="envelope-closed" className="mr-2" />
            <a
              href={`mailto:${get(student, 'email')}`}
            >{get(student, 'email')}
            </a>
          </div>
          <div className="d-flex align-items-center mb-2">
            <Icon
              name="location"
              className="mr-2"
            /> {get(student, 'street')}, {get(student, 'postalCode')} {get(student, 'city')}
          </div>
          <div className="d-flex align-items-center mb-2">
            <Icon name="people" className="mr-2" /> klasa {get(student, 'className')}
          </div>
          <div className="d-flex align-items-center mb-2">
            <Icon name="calendar" className="mr-2" /> {formatDate(get(student, 'birthDate'))}
          </div>
        </div>
      </div>
      <div className="col-md">
        <h6>Grupy</h6>
        {get(student, 'groups', [])
          .map(group => (
            <div key={group._id}><Link to={`/group/${group._id}`}>{group.code}</Link></div>))}
      </div>
    </div>);
}

// TODO show payments only from current season
function StudentPayments({ student }) {
  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">Kwota</th>
        <th scope="col">Data</th>
        <th scope="col">Akcje</th>
      </tr>
      </thead>
      <tbody>
      {student && student.studentPayments.map(payment => (
        <tr key={payment._id}>
          <td>{payment.amount} PLN</td>
          <td>{payment.operationDate.substr(0, 10)}</td>
          <td>
            <Link to={`/banktransfer/${payment.paymentBankTransfer}/assign`}><Icon
              name="link-intact"
            />
            </Link>
          </td>
        </tr>))}
      </tbody>
    </table>);
}

const linkClass = 'nav-link';
const activeLinkClass = 'nav-link active';

function StudentDetails({ location, student, currentRoute }) {
  return (
    <React.Fragment>
      <h2
        className="d-flex justify-content-between"
      >{student.getFullName()}
        <small className="text-muted">
          <Link to={`/student/edit/${student._id}`}>
            <Icon name="pencil" />
          </Link>
        </small>
      </h2>
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
              <Link
                to={`/student/${student._id}`}
                className={currentRoute === 'data' ? activeLinkClass : linkClass}
              >Dane
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={`/student/${student._id}/payments`}
                className={currentRoute === 'payments' ? activeLinkClass : linkClass}
              >Płatności
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="SMS">SMS</a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <Route
            exact
            path="/student/:id"
            render={() => <StudentData student={student} />}
          />
          <Route
            path="/student/:id/payments"
            render={() => <StudentPayments student={student} />}
          />
        </div>
      </div>

    </React.Fragment>);
}

export default StudentDetails;
