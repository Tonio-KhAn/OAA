import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function JobInfo(props) {
  const [testid, setTestid] = useState("");
    const[ values, setValues] = useState(
        {jobtitle: 'IT Manage', company: 'A Company', description:'A Job description goes here'},
    )
    const[ inputFields, setInputFields] = useState([
    ])
    
    function getMedias(){
      const token = props.auth.token;
      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios
      .get(
        "/jobApplication/all/"+ props.match.params.id,
        config
      )
      .then(
        res => { console.log(res.data)
          setInputFields(res.data)
        },
      )
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getMedias();
  }, []);

    return (
     <>
     <div>
     <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
            <h5 class="card-header">Jobs</h5>
                { inputFields.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.userID}</h5>
                        <p class="card-text"></p>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                    ))}
            </div>
</div>

        </>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(JobInfo);


