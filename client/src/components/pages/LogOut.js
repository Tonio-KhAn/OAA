import React from 'react';
import { connect } from 'react-redux';
import {logout} from '../../actions/authActions';
import { Redirect } from 'react-router';

function Logout(props){
    function logOutClick(){
        props.logout();
        console.log("logged out")
    }

    if (props.isAuthenicated) {
        return (
          <>
            <div>
                <a href="#"  className="nav-link" onClick={logOutClick()}>Logout</a>
            </div>
          </>
        )
      }
      else{
        return (<Redirect push to="/" />
        );
      }
}

const mapStateToProps = state =>({
    isAuthenicated: state.auth.isAuthenticated,
    error:state.error
  }); 

  
const mapDispatchToProps = dispatch => {
    return{
      logout: () => dispatch(logout())  }
  }
  


export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Logout);