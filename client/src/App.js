import React , { Component , Fragment} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/pages/About';
import Chat from './components/pages/Chat';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Reset from './components/pages/ResetPassword';
import createPost from './components/pages/createPost';
import Profile from './components/pages/Profile';
import ConfirmEmail from './components/pages/ConfirmEmail';
import JobOpportunity from './components/pages/JobOpportunityFeed';
import LogOut from './components/pages/LogOut';
import AllJobs from './components/pages/AllJobs';
import RecomendedJobs from './components/pages/RecomendedJobs';
import Apply from './components/pages/Apply';
import ManageDegree from './components/tabs/ManageDegrees';
import EditProfile from './components/tabs/editProfile';
import CreateJobs from './components/pages/CreateJobs';
import Verification from './components/pages/Verification';
import JobInfo from './components/pages/JobInfo';
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from './components/pages/PostsFeed';
import AllPosts from './components/pages/AllPosts';
import CreatePosts from './components/pages/CreatePosts';
import Resume from './components/tabs/resume';
import AdminHome from './components/admin/home';
import AdminJob from './components/admin/job';
import AdminUser from './components/admin/user';
import AdminPost from './components/admin/post';
import AdminCourse from './components/admin/course';
import AdminDegree from './components/admin/degree';
import AdminSkill from './components/admin/skill';
import friends from './components/pages/friends';
import AdminGrade from './components/admin/grade';
import AdminReports from './components/admin/reports';
import CommunityFeed from './components/pages/CommunityFeed';
import AllUsers from './components/pages/AllUsers';
import MyUsers from './components/pages/MyUsers';
import SuggestedUsers from './components/pages/SuggestedUsers';


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
          <Route path='/profile/manageDegrees' component={ManageDegree} />
          <Route path='/profile/editProfile' component={EditProfile} />
          <Route path='/profile/resume' component={Resume} />
          <Route path='/confirm/' component={ConfirmEmail} />
          <Route path='/jobs' component={JobOpportunity} />
          <Route path='/all' component={AllJobs} />
          <Route path='/my' component={RecomendedJobs} />
          <Route path='/info/:id' component={JobInfo} />
          <Route path='/apply/:id' component={Apply} />
          <Route path='/jobscreate' component={CreateJobs}/>
          <Route path='/logout' component={LogOut} />
          <Route path='/verification/:id' component={Verification} />
          <Route path='/reset' component={Reset} />
          <Route path='/posts' component={Posts} />
          <Route path='/postsall' component={AllPosts} />
          <Route path='/postscreate' component={CreatePosts} />
          <Route path='/chat' component={Chat}/>
          <Route path='/communityfeed' component={CommunityFeed} />
          <Route path='/community' component={AllUsers} />
          <Route path='/myfriends' component={MyUsers} />
          <Route path='/suggestedfriends' component={SuggestedUsers} />
           
          <Route path='/admin' exact component={AdminHome} />
          <Route path='/admin/job'  component={AdminJob} />
          <Route path='/admin/user'  component={AdminUser} />
          <Route path='/admin/post' component={AdminPost} />
          <Route path='/admin/course' component={AdminCourse} />
          <Route path='/admin/degree'  component={AdminDegree} />
          <Route path='/admin/skill'  component={AdminSkill} />
          <Route path='/friends' component={friends} />
          <Route path='/admin/grade'  component={AdminGrade} />
          <Route path='/admin/reports'  component={AdminReports} />
      </Router>
      </Provider>
    </>
  );
}
}
export default App;
