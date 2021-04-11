import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import {connect} from 'react-redux';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

 
 
  return (
    <>
    {
    props.auth.isAuthenticated ?(
      <div className='navbar navbar-fixed-top'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            DCIT Connect
            <i class="fas fa-user-graduate"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/community' className='nav-links' onClick={closeMobileMenu}>
                Community
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/postsall' className='nav-links' onClick={closeMobileMenu}>
                Posts
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/all'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Job Opportunities
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/chat'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Chat
              </Link>
            </li>
          </ul>
          
          <Link to='/logout' onClick={closeMobileMenu}>
          {<button className='bbutton'>LOG OUT</button>}
          </Link>
        </div>
      </div>
  ) : (
      <div className='navbar navbar-fixed-top'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            DCIT Connect
            <i class="fas fa-user-graduate"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          <Link to={'/register'}>
          {<button className='bbutton'>SIGN UP</button>}
          </Link>
        </div>
      </div>
   ) 
  }
  </>
  )
}
const mapStateToProps = state =>({
  auth: state.auth,
  error:state.error
}); 
export default connect(
  mapStateToProps,
)(Navbar);