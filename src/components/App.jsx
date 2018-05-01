import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import NavBar from './NavBar';
import GroupViewContainer from './GroupViewContainer';
import SvgSprite from './SvgSprite';
import StudentEdit from './StudentEdit';
import StudentCreate from './StudentCreate';
import StudentDetails from './StudentDetails';
import GroupEdit from './GroupEdit';
import GroupCreate from './GroupCreate';
import Login from './Login';
import auth from '../services/auth';
import ConnectTransfers from './ConnectTransfers';
import BankTransferAssign from './BankTransferAssign';
import GroupPaymentCheck from './GroupPaymentCheck';
import AttendanceList from './AttendanceList';
import GroupListContainer from './GroupListContainer';

class App extends Component {
  static onLoggedIn(data) {
    auth.setJWT(data.jwt);
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: !!auth.jwt,
    };

    auth.subscribe(() => {
      if (auth.jwt) {
        this.setState({
          isLoggedIn: true,
        });
      } else {
        this.setState({
          isLoggedIn: false,
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <NavBar />
          <div className="container">
            {!this.state.isLoggedIn ? <Login onLoggedIn={App.onLoggedIn} /> :
            <React.Fragment>
              <Route exact path="/" component={GroupListContainer} />
              <Route exact path="/group/:id([a-f0-9]{24})" component={GroupViewContainer} />
              <Route exact path="/group/:id([a-f0-9]{24})/attendance-list" component={AttendanceList} />
              <Route path="/group/:id/edit" component={GroupEdit} />
              <Route path="/group/:id/payment-check" component={GroupPaymentCheck} />
              <Route path="/group/new" component={GroupCreate} />
              <Route path="/groups" component={GroupListContainer} />
              <Route path="/student/:id([a-f0-9]{24})" component={StudentDetails} />
              <Route path="/student/edit/:id" component={StudentEdit} />
              <Route path="/student/new/:groupId" component={StudentCreate} />
              <Route path="/connect-transfers/:company" component={ConnectTransfers} />
              <Route path="/banktransfer/:id([a-f0-9]{24})/assign" component={BankTransferAssign} />
            </React.Fragment>
            }
          </div>
          <ToastContainer />
          <SvgSprite />
        </div>
      </Router>
    );
  }
}

export default App;
