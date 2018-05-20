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
import StudentEditContainer from './StudentEditContainer';
import StudentCreateContainer from './StudentCreateContainer';
import StudentDetailsContainer from './StudentDetailsContainer';
import GroupEditContainer from './GroupEditContainer';
import GroupCreateContainer from './GroupCreateContainer';
import Login from './Login';
import auth from '../services/auth';
import ConnectTransfersContainer from './ConnectTransfersContainer';
import BankTransferAssignContainer from './BankTransferAssignContainer';
import GroupPaymentCheckContainer from './GroupPaymentCheckContainer';
import AttendanceListContainer from './AttendanceListContainer';
import GroupListContainer from './GroupListContainer';
import GroupArchiveListContainer from './GroupArchiveListContainer';
import SendMessageBoxContainer from './SendMessageBoxContainer';

class App extends Component {
  static onLoggedIn(data) {
    auth.setJWT(data.jwt);
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: !!auth.jwt,
    };
  }

  componentDidMount() {
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
              <Route exact path="/group/:id([a-f0-9]{24})/attendance-list" component={AttendanceListContainer} />
              <Route path="/group/:id/edit" component={GroupEditContainer} />
              <Route path="/group/:id/payment-check" component={GroupPaymentCheckContainer} />
              <Route path="/group/new" component={GroupCreateContainer} />
              <Route exact path="/groups" component={GroupListContainer} />
              <Route path="/groups/archive" component={GroupArchiveListContainer} />
              <Route path="/student/:id([a-f0-9]{24})" component={StudentDetailsContainer} />
              <Route path="/student/edit/:id" component={StudentEditContainer} />
              <Route path="/student/new/:groupId" component={StudentCreateContainer} />
              <Route path="/connect-transfers/:company" component={ConnectTransfersContainer} />
              <Route path="/banktransfer/:id([a-f0-9]{24})/assign" component={BankTransferAssignContainer} />
            </React.Fragment>
            }
          </div>
          <SendMessageBoxContainer />
          <ToastContainer />
          <SvgSprite />
        </div>
      </Router>
    );
  }
}

export default App;
