import React , { Component }from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import createPost from './components/pages/createPost';
import Profile from './components/pages/Profile';
import ConfirmEmail from './components/pages/ConfirmEmail';
import JobOpportunity from './components/pages/JobOpportunityFeed';
import LogOut from './components/pages/LogOut';
import Verification from './components/pages/Verification';
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {


  render() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/createPost' component={createPost} />
          <Route path='/profile' component={Profile} />
          <Route path='/confirm/' component={ConfirmEmail} />
          <Route path='/jobs' component={JobOpportunity} />
          <Route path='/logout' component={LogOut} />
          <Route path='/verification/:id' component={Verification} />
        </Switch>
      </Router>
      </Provider>
    </>
  );
}
}
export default App;
