import React , { Component , Fragment} from 'react';
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
import AllJobs from './components/tabs/AllJobs';
import RecomendedJobs from './components/tabs/RecomendedJobs';
import Apply from './components/pages/Apply';
import CreateJobs from './components/tabs/CreateJobs';
import Verification from './components/pages/Verification';
import { loadUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {


  render() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Navbar />
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/createPost' component={createPost} />
          <Route path='/profile' component={Profile} />
          <Route path='/confirm/' component={ConfirmEmail} />
          <Route path='/jobs' component={JobOpportunity} />
          <Route path='/jobs/all' component={AllJobs} />
          <Route path='/jobs/my' component={RecomendedJobs} />
          <Route path='/apply/:id' component={Apply} />
          <Route path='/jobs/create' component={CreateJobs}/>
          <Route path='/logout' component={LogOut} />
          <Route path='/verification/:id' component={Verification} />
      </Router>
      </Provider>
    </>
  );
}
}
export default App;
