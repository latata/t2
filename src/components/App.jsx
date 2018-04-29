import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import GroupView from './GroupView';
import SvgSprite from './SvgSprite';
import StudentEdit from './StudentEdit';
import StudentCreate from './StudentCreate';
import GroupList from './GroupList';
import StudentDetails from './StudentDetails';
import GroupEdit from './GroupEdit';
import GroupCreate from './GroupCreate';
import Login from './Login';
import auth from '../auth';
import ConnectTransfers from './ConnectTransfers';
import BankTransferAssign from './BankTransferAssign';
import GroupPaymentCheck from './GroupPaymentCheck';

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
              <Route exact path="/" component={GroupList} />
              <Route exact path="/group/:id([a-f0-9]{24})" component={GroupView} />
              <Route path="/group/:id/edit" component={GroupEdit} />
              <Route path="/group/:id/payment-check" component={GroupPaymentCheck} />
              <Route path="/group/new" component={GroupCreate} />
              <Route path="/groups" component={GroupList} />
              <Route path="/student/:id([a-f0-9]{24})" component={StudentDetails} />
              <Route path="/student/edit/:id" component={StudentEdit} />
              <Route path="/student/new/:groupId" component={StudentCreate} />
              <Route path="/connect-transfers" component={ConnectTransfers} />
              <Route path="/banktransfer/:id([a-f0-9]{24})/assign" component={BankTransferAssign} />
            </React.Fragment>
            }
          </div>
          <SvgSprite />
        </div>
      </Router>
    );
  }
}

export default App;
