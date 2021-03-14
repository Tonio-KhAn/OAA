import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import {connect} from 'react-redux';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  if (props.isAuthenicated) {
  return (
    <>
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
              <Link to='/Profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/posts/all' className='nav-links' onClick={closeMobileMenu}>
                Post
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/jobs/all'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Job Opportunities
              </Link>
            </li>
            
          
            <li className='nav-item'>
              <Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
                Logout
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </>
  )
}

  return (
    <>
      <nav className='navbar navbar-fixed-top'>
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
            <li>
              <Link
                to='/register'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sign Up
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
        </div>
      </nav>
    </>
  );
}

const mapStateToProps = state =>({
  isAuthenicated: state.auth.isAuthenticated,
  error:state.error
}); 




export default connect(
  mapStateToProps)
  (Navbar)