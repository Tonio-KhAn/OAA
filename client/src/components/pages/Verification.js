import React, { useState } from 'react';
import { connect } from 'react-redux';
import {logout} from '../../actions/authActions';
import axios from "axios";

import { Redirect, useParams } from 'react-router';


function Verification(props){
    const [isVerified, setIsVerified] = useState(false);
        const id = useParams().id;
        console.log(id);

        function verify(){
        axios
        .post(
          "/users/verify/" + id,
        )
        .then(
          res =>{ 
          console.log(res.data)
          if  (res.data.msg == 'User already verified'){
              alert('User already verified try login in')
          }

        },
          setIsVerified(true)
        )
        .catch(err => console.log(err));
        };
        
        if (isVerified) {
            return <Redirect push to="/login" />;
            }
        return (
          <>
            <div>
                <a href="#"  className="nav-link" onClick={verify()}></a>
            </div>
          </>
        )
      
}

export default Verification;