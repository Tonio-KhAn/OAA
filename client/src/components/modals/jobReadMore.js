import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

function JobReadMore(props) {
    const[ jobOpportunity, setJobOpportunity] = useState([])
    
    const[ applyiedJobs, setApplyiedJobs] = useState([])

    function loadUser(){
      const token = props.auth.token;
    
      const config = {
        headers: {}
      };
    
      if (token) {
        config.headers["x-auth-token"] = token;
      }
    
      axios
      .get(
        "/users/user",
        config
      )
      .then(
        res => { console.log(res.data)
        getAppliedJobs(res.data._id)
        getJobOpportunity(res.data._id)
        console.log(res.data._id);
        },
      )
      .catch(err => console.log(err));
      
  }

    function getJobOpportunity(userID) {

        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios.get('/jobOpportunity/allJobs/' + userID, config)
        .then(
            res => { console.log(res.data)
            var tempArray = [];
            var count = 0;
            res.data.forEach(temp =>{
              if (temp.open === true){
                tempArray.push(temp)
              }
            count ++  
            if (count === res.data.length)
              setJobOpportunity(tempArray);
            })
            
            },
          )
          .catch(err => console.log(err));

    }

    function getAppliedJobs(userID) {

      const token = props.auth.token;

      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios.get('/jobOpportunity/applyiedJobs/' + userID, config)
      .then(
          res => { console.log(res.data)
          setApplyiedJobs(res.data)
          },
        )
        .catch(err => console.log(err));

  }

    useEffect(() => {
        
        loadUser();
      }, []);

    return (
     <> 
     <div >
     <Button> Open Modal</Button>
     <Modal show = {false}>
         <Modal.Header></Modal.Header>
         <Modal.Body>hello</Modal.Body>
     </Modal>
    </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(JobReadMore);